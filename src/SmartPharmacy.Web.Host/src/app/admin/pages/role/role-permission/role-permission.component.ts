import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNode,
} from "ng-zorro-antd/tree";
import { AppComponentBase } from "shared/app-component-base";
import {
  GetPermissionsOutputDto,
  PermissionDto,
  RoleServiceProxy,
  SetPermissionsInputDto,
} from "shared/service-proxies/service-proxies";

@Component({
  selector: "app-role-permission",
  templateUrl: "./role-permission.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolePermissionPage extends AppComponentBase implements OnInit {
  @ViewChild("nzTreeComponent", { static: false })
  nzTreeComponent!: NzTreeComponent;
  constructor(
    private _roleService: RoleServiceProxy,
    private _injector: Injector,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    super(_injector);
  }

  roleId: number;
  allPermissionList: PermissionDto[] = [];
  adminSystemPermissionList: PermissionDto[] = [];

  permissionNodes: NzTreeNode[] = [
    new NzTreeNode({
      title: this.l("All"),
      key: "Permission",
    }),
  ];

  ngOnInit(): void {
    this._roleService.getAllPermissions().subscribe((data) => {
      this.allPermissionList = data.items;

      this.adminSystemPermissionList = this.allPermissionList.filter((x) => {
        return x.parent === "Permission";
      });

      this.setPermissionNodes();
    });

    this.roleId = Number(
      this.route.snapshot.queryParamMap.get(this.l("roleId"))
    );

    this._roleService.getPermissions(this.roleId).subscribe((data) => {
      this.setPermissionNodes(data.items);
    });
  }

  setPermissionNodes(rolePermissionsList?: GetPermissionsOutputDto[]): void {
    const rootNode = this.permissionNodes[0];
    rootNode.clearChildren();
    rootNode.setChecked(
      rolePermissionsList?.find((x) => x.name === "Permission") ? true : false
    );

    this.adminSystemPermissionList.forEach((permissionItem) => {
      rootNode.addChildren([
        new NzTreeNode({
          title: permissionItem.displayName,
          key: permissionItem.name,
          expanded: true,
          checked: rolePermissionsList?.find(
            (x) => x.name == permissionItem.name
          )
            ? true
            : false,
          children: this.allPermissionList
            .filter(
              (childPermissionItem) =>
                childPermissionItem.parent === permissionItem.name
            )
            .map((mapItem) => {
              return {
                title: mapItem.displayName,
                key: mapItem.name,
                expanded: true,
                checked: rolePermissionsList?.find(
                  (x) => x.name == mapItem.name
                )
                  ? true
                  : false,
                isLeaf: true,
              };
            }),
        }),
      ]);
    });
  }

  saveCheckedPermissions(): void {
    const setPermissionsInputDto = new SetPermissionsInputDto();
    setPermissionsInputDto.roleId = this.roleId;
    setPermissionsInputDto.permissions = [];
    this.nzTreeComponent.getTreeNodes().forEach((item) => {
      if (item.isHalfChecked || item.isChecked) {
        setPermissionsInputDto.permissions.push(item.key);
      }
      item.children.forEach((childItem) => {
        if (childItem.isHalfChecked || childItem.isChecked) {
          setPermissionsInputDto.permissions.push(childItem.key);
        }
        childItem.children.forEach((childChildItem) => {
          if (childChildItem.isHalfChecked || childChildItem.isChecked) {
            setPermissionsInputDto.permissions.push(childChildItem.key);
          }
        });
      });
    });
    this._roleService
      .setPermissions(setPermissionsInputDto)
      .subscribe((response) => {
        console.log(response);
      });
  }

  nzEvent(event: NzFormatEmitEvent): void {}
}
