import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";

@UseGuards(AuthTokenGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.usersService.create(createUserDto, tokenPayload);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.usersService.update(id, updateUserDto, tokenPayload);
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.usersService.remove(id, tokenPayload);
  }
}
