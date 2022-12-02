import { HttpStatus } from "@nestjs/common";
import Productos from "./products.model";

export type Tipo = { status: HttpStatus; payload: { message: string }; } | { status: HttpStatus; payload: Productos[]; };
