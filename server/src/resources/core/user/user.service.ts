import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { USER_NOT_FOUND_Exception } from 'src/common/exceptions/User_not_found.exception';
import * as fs from 'fs';
import * as path from 'path';
import { Unsupported_FILE_Exception } from 'src/common/exceptions/UNSPORTED_FILE.exception';
import { BalanceService } from 'src/resources/billing/balance/services/balance.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly balanceService: BalanceService,
  ) {}

  /*   async create(createUserDto: CreateUserDto) {
    const role = await this.prisma.role.findUnique({
      where: {
        name: 'costumer',
      },
    });
    const user = await this.prisma.user.create({
      data: {
        id: uuid(),
        roleId: !createUserDto.roleId && role.id,
        ...createUserDto,
      },
    });
    return user;
  } */

  async adminCreate(createUserDto: CreateUserDto) {
    const imagePath = createUserDto.file
      ? this.storeUserImage(uuid(), createUserDto.file)
      : '';
    const user = await this.prisma.user.create({
      data: {
        id: uuid(),
        roleId: createUserDto.roleId,
        avatar: imagePath,
        address: createUserDto.address,
        name: createUserDto.name,
        phoneNumber: createUserDto.phoneNumber,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });

    await this.balanceService.initializeBalance(user.id);
    return user;
  }

  async getUsersList(page: number, search: string) {
    const pageSize = 10; // Adjust this to the number of users per page

    const users = await this.prisma.user.findMany({
      include: {
        role: {
          select: {
            name: true,
          },
        },
        balance: {
          select: {
            Balance: true,
          },
        },
      },
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
          {
            role: {
              name: {
                contains: search,
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * pageSize, // Skip previous pages
      take: pageSize, // Take the pageSize limit for pagination
    });

    const totalUsers = await this.prisma.user.count({
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
          {
            role: {
              name: {
                contains: search,
              },
            },
          },
        ],
      },
    });

    return {
      users,
      pageCount: Math.ceil(totalUsers / pageSize),
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          select: {
            rolelvl: true,
          },
        },
      },
    });
    if (user) return user;
    if (!user) throw new USER_NOT_FOUND_Exception(id);
  }

  async findStoredUserFromToken(userId: string) {
    const user = await this.findOne(userId);
    return user;
  }

  async ProfileUpdate(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const imagePath = updateUserDto.file
      ? this.storeUserImage(id, updateUserDto.file)
      : undefined;

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(imagePath && { avatar: imagePath }),
        name: updateUserDto.name,
        email: updateUserDto.email,
        phoneNumber: updateUserDto.phoneNumber,
        address: updateUserDto.address,
        roleId: updateUserDto.roleId,
        password: updateUserDto.password,
      },
    });
    return user;
  }

  async adminUpdate(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const imagePath = updateUserDto.file
      ? this.storeUserImage(id, updateUserDto.file)
      : undefined;

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(imagePath && { avatar: imagePath }),
        name: updateUserDto.name,
        email: updateUserDto.email,
        phoneNumber: updateUserDto.phoneNumber,
        address: updateUserDto.address,
        roleId: updateUserDto.roleId,
        password: updateUserDto.password,
      },
    });
    return user;
  }

  /*   async update(id: string, updateUserDto: UpdateUserDto) {
    this.findOne(id);
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }
 */
  async remove(id: string) {
    this.findOne(id);
    const user = await this.prisma.user.delete({ where: { id } });
    return user;
  }

  private storeUserImage(userId: string, file: Express.Multer.File): string {
    const documentsRoot = path.join(
      'D:/Oussama/PROJECTS/Economa/client/public/assets/avatars',
    );
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (!['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
      throw new Unsupported_FILE_Exception(fileExtension);
    }

    const fileName = `${userId}${fileExtension}`;
    const filePath = path.join(documentsRoot, fileName);

    try {
      if (!fs.existsSync(documentsRoot)) {
        fs.mkdirSync(documentsRoot, { recursive: true });
      }

      const existingFiles = fs
        .readdirSync(documentsRoot)
        .filter((f) => f.startsWith(userId));

      if (existingFiles.length > 0) {
        existingFiles.forEach((existingFile) => {
          fs.unlinkSync(path.join(documentsRoot, existingFile));
        });
      }

      fs.writeFileSync(filePath, file.buffer);
      return `/assets/avatars/${fileName}`;
    } catch (error) {
      throw new Error(`Failed to store user image: ${error.message}`);
    }
  }
}
