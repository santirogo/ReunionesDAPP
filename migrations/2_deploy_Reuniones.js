var Reuniones = artifacts.require("./Reuniones.sol");
module.exports = function(deployer) {
  deployer.deploy(Reuniones);
};
