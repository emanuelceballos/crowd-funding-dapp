const CrowdFunding = artifacts.require("CrowdFunding");

module.exports = async function (deployer) {
  const _24hs = 86400;
  await deployer.deploy(CrowdFunding, 150000, _24hs);
};
