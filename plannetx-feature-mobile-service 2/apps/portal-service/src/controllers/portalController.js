const httpError = require("../constants/errors/httpError");

const { HttpError } = require("../helpers/error");

const masterMapPortalPermissionModel = require("../models/masterMapPortalPermissionModel");
const masterPortalPermissionModel = require("../models/masterPortalPermissionModel");

exports.findPortalPermissions = () => (req, res, next) => {
  const user = req.user;
  const query = {
    include: [
      {
        model: masterPortalPermissionModel,
        as: "permission",
        required: true,
      },
    ],
    where: {
      portalTypeId: user.portalTypeId,
      portalSubTypeId: user.portalSubTypeId,
    },
  };
  masterMapPortalPermissionModel
    .findAll(query)
    .then((permissionMapping) => {
      req.permissions = permissionMapping.map((permission) => ({
        name: permission.permission.name,
        list: permission.list,
        detail: permission.detail,
        create: permission.create,
        edit: permission.edit,
        delete: permission.delete,
        export: permission.export,
      }));
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.validatePortalPermission = (name, action) => (req, res, next) => {
  const permission = req.permissions.find(
    (permission) => permission.name === name
  );

  if (!permission) {
    next(new HttpError(httpError.ERR_HTTP_403));
  } else {
    if (!permission[action.toLowerCase()]) {
      next(new HttpError(httpError.ERR_HTTP_403));
    } else {
      next();
    }
  }
};
