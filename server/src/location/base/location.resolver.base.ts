import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { DeleteLocationArgs } from "./DeleteLocationArgs";
import { LocationFindManyArgs } from "./LocationFindManyArgs";
import { LocationFindUniqueArgs } from "./LocationFindUniqueArgs";
import { Location } from "./Location";
import { ProjectFindManyArgs } from "../../project/base/ProjectFindManyArgs";
import { Project } from "../../project/base/Project";
import { LocationService } from "../location.service";

@graphql.Resolver(() => Location)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class LocationResolverBase {
  constructor(
    protected readonly service: LocationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Location",
    action: "read",
    possession: "any",
  })
  async _locationsMeta(
    @graphql.Args() args: LocationFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Location])
  @nestAccessControl.UseRoles({
    resource: "Location",
    action: "read",
    possession: "any",
  })
  async locations(
    @graphql.Args() args: LocationFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Location[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Location",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Location, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Location",
    action: "read",
    possession: "own",
  })
  async location(
    @graphql.Args() args: LocationFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Location | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Location",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Location)
  @nestAccessControl.UseRoles({
    resource: "Location",
    action: "delete",
    possession: "any",
  })
  async deleteLocation(
    @graphql.Args() args: DeleteLocationArgs
  ): Promise<Location | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [Project])
  @nestAccessControl.UseRoles({
    resource: "Location",
    action: "read",
    possession: "any",
  })
  async projects(
    @graphql.Parent() parent: Location,
    @graphql.Args() args: ProjectFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Project[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Project",
    });
    const results = await this.service.findProjects(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
