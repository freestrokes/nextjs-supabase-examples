export class ConsoleParam {
  public sortKey?: SortKey;
  public sortDir?: SortDirection;
  public search?: string;
  public projectId?: string;
}

export enum SortDirection {
  desc = 'desc',
  asc = 'asc'
}

export enum SortMarkUp {
  default = 'link-sorting',
  desc = 'link-sorting type-desc', //내림차순
  asc = 'link-sorting type-asc' //오름차순
}

export enum SortKey {
  Instance_Hostname = 'hostname',
  Instance_Id = 'uuid',
  Image_Name = 'name',
  Image_UpdatedAt = 'updated_at',
  Volume_Name = 'name',
  VolumeSnapshot_UpdatedAt = 'updated_at',
  Loadbalancer_Name = 'name',
  Loadbalancer_Project = 'project_name',
  Network_Name = 'name',
  Network_ID = 'id',
  Subnet_Name = 'name',
  Subnet_Project = 'project_name',
  Flavor_Name = 'name',
  Flavor_ID = 'id',
  Port_ID = 'id',
  Router_Name = 'name',
  Router_ID = 'id',
  Security_Name = 'name',
  FloatingIp_Address = 'floating_ip_address',
  FloatingIp_NetworkID='network_name',
  Keypair_Name = 'name',
  Keypair_CreatedAt = 'created_at'
}

export interface Result<T> {
  code: string;
  message: string;
  data: T;
}

export class Parameter {
  public teamId?: string;
  public domainId?: string;
  public projectId?: string;
  public regionId?: string;
  public keyword?: string;
  public marker?: string;
  public limit?: number;
  public status?: string;
  public p?: boolean;

  constructor(domainId?: string, regionId?: string, projectId?: string, marker?: string, p?: boolean) {
    this.domainId = domainId;
    this.regionId = regionId;

    if (projectId) {
      this.projectId = projectId;
    }
    if (marker) {
      this.marker = marker;
    }
    if (p) {
      this.p = p;
    }
  }
}

export class Regex {
  static readonly cidr = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))+$/;
  static readonly ip = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
}
