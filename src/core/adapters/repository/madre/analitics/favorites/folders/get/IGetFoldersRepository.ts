import { Marketplace } from "@/src/core/entitis/madre/analitics/favorites/folder/status/marketplace.types";

export interface IGetFoldersRepository {
execute(): Promise<Marketplace[]>}