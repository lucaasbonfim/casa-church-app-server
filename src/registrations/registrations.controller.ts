import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { RegistrationsService } from "./registrations.service";
import { CreateRegistrationDto } from "./dto/create-registration.dto";
import { UpdateRegistrationDto } from "./dto/update-registration.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { UseGuards } from "@nestjs/common";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindRegistrationsQueryDto } from "./dto/find-registrations-query.dto";

@UseGuards(AuthTokenGuard)
@Controller("registrations")
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  create(
    @Body() createRegistrationDto: CreateRegistrationDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.registrationsService.create(
      createRegistrationDto,
      tokenPayload
    );
  }

  @Get()
  findAll(
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
    @Query() findRegistrationsQuery: FindRegistrationsQueryDto
  ) {
    return this.registrationsService.findAll(
      tokenPayload,
      findRegistrationsQuery
    );
  }

  @Get(":id")
  findOne(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.registrationsService.findOne(id, tokenPayload);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.registrationsService.update(
      id,
      updateRegistrationDto,
      tokenPayload
    );
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.registrationsService.remove(id, tokenPayload);
  }
}
