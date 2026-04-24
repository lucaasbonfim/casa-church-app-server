import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("health")
@Controller("health")
export class HealthController {
  @ApiOperation({ summary: "Verificar se a API esta online" })
  @ApiResponse({
    status: 200,
    description: "API online",
    schema: {
      example: {
        status: "ok",
        uptime: 123.45,
        timestamp: "2026-04-24T23:00:00.000Z",
      },
    },
  })
  @Get()
  check() {
    return {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
