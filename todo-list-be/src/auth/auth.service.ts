import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/api/user/user.service';
import { CreateUserDto } from 'src/api/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        const userExists = await this.usersService.getUserByEmail(
            createUserDto.email,
        );
        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        // Hash password
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.usersService.create({
            ...createUserDto,
            password: hash,
        });
        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return {
            user: {
                id: newUser.id,
                email: newUser.email
            },
            tokens,
        };
    }

    async signIn(auth: AuthDto) {
        const user = await this.usersService.getUserByEmail(auth.email);
        if (!user) throw new BadRequestException('User does not exist');
        const passwordMatches = await bcrypt.compare(auth.password, user.password);
        if (!passwordMatches)
            throw new BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            user: {
                id: user.id,
                email: user.email
            },
            tokens,
        };
    }

    async logout(userId: number) {
        return this.usersService.updateRFToken(userId, null);
    }

    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

    async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.updateRFToken(userId, hashedRefreshToken);
    }

    async getTokens(userId: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(userId: number, refreshToken: string) {
        const user = await this.usersService.findOne(userId);
        if (!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied 1');
        const refreshTokenMatches = await bcrypt.compare(
            refreshToken,
            user.refreshToken
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied 2');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            user: {
                id: user.id,
                email: user.email
            },
            tokens
        };
    }
}
