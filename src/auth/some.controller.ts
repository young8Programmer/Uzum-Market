import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "../user/user-role.enum";
import { RolesGuard } from "../auth/roles.guard"

@Controller("some-protected-route")
@UseGuards(RolesGuard)
export class SomeController {
  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  someProtectedRoute() {
    return "kirish uchun sizda ruxsat bor"
  }
}
