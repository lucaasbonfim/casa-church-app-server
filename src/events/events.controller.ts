import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindEventsQueryDto } from "./dto/find-events-query.dto";

@UseGuards(AuthTokenGuard)
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.eventsService.create(createEventDto, tokenPayload);
  }

  @Get()
  findAll(@Query() findEventsQuery: FindEventsQueryDto) {
    return this.eventsService.findAll(findEventsQuery);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEventDto: UpdateEventDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.eventsService.update(id, updateEventDto, tokenPayload);
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.eventsService.remove(id, tokenPayload);
  }
}
