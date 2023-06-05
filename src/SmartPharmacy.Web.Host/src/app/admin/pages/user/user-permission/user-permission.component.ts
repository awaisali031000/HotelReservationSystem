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
  GetUserPermissionsOutputDto,
  SetUserPermissionsInputDto,
  UserPermissionDto,
  UserServiceProxy,
} from "shared/service-proxies/service-proxies";

@Component({
  selector: "app-user-permission",
  templateUrl: "./user-permission.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPermissionPage extends AppComponentBase implements OnInit {
  @ViewChild("nzTreeComponent", { static: false })
  nzTreeComponent!: NzTreeComponent;
  constructor(
    private _userService: UserServiceProxy,
    private _injector: Injector,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    super(_injector);
  }

  userId: string;
  tenantId: number;
  allPermissionList: UserPermissionDto[] = [];
  adminSystemPermissionList: UserPermissionDto[] = [];

  permissionNodes: NzTreeNode[] = [
    new NzTreeNode({
      title: this.l("All"),
      key: "Permission",
    }),
  ];

  ngOnInit(): void {
    this.userId = String(this.route.snapshot.queryParamMap.get("userId"));
    this.tenantId =
      Number(this.route.snapshot.queryParamMap.get("tenantId")) || null;
    //page 1 tenant
    if (this.tenantId > 0) {
      this._userService.getAllPermissions(1).subscribe((data) => {
        this.allPermissionList = data.items;

        this.adminSystemPermissionList = this.allPermissionList.filter((x) => {
          return x.parent === "Permission";
        });

        this.setPermissionNodes();
      });
    } else {
      //page 2 admin
      this._userService.getAllPermissions(2).subscribe((data) => {
        this.allPermissionList = data.items;

        this.adminSystemPermissionList = this.allPermissionList.filter((x) => {
          return x.parent === "Permission";
        });

        this.setPermissionNodes();
      });
    }

    this._userService
      .getPermissions(this.tenantId, this.userId)
      .subscribe((data) => {
        this.setPermissionNodes(data.items);
      });
  }

  setPermissionNodes(
    userPermissionsList?: GetUserPermissionsOutputDto[]
  ): void {
    const rootNode = this.permissionNodes[0];
    rootNode.clearChildren();
    rootNode.setChecked(
      userPermissionsList?.find((x) => x.name === "Permission") ? true : false
    );

    this.adminSystemPermissionList.forEach((permissionItem) => {
      rootNode.addChildren([
        new NzTreeNode({
          title: permissionItem.displayName,
          key: permissionItem.name,
          expanded: true,
          checked: userPermissionsList?.find(
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
                checked: userPermissionsList?.find(
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
    const setPermissionsInputDto = new SetUserPermissionsInputDto();
    setPermissionsInputDto.tenantId = this.tenantId;
    setPermissionsInputDto.userId = this.userId;
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
    this._userService
      .setPermissions(setPermissionsInputDto)
      .subscribe((response) => {
        console.log(response);
      });
  }

  nzEvent(event: NzFormatEmitEvent): void {}
}
