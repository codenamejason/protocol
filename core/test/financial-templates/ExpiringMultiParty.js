const { toWei } = web3.utils;

// Tested Contract
const ExpiringMultiParty = artifacts.require("ExpiringMultiParty");

// Helper Contracts
const Finder = artifacts.require("Finder");
const IdentifierWhitelist = artifacts.require("IdentifierWhitelist");
const Token = artifacts.require("ExpandedERC20");

contract("ExpiringMultiParty", function(accounts) {
  it("Can deploy", async function() {
    const collateralToken = await Token.new({ from: accounts[0] });

    const constructorParams = {
      isTest: true,
      expirationTimestamp: "1234567890",
      withdrawalLiveness: "1000",
      siphonDelay: "100000",
      collateralAddress: collateralToken.address,
      finderAddress: Finder.address,
      priceFeedIdentifier: web3.utils.utf8ToHex("UMATEST"),
      syntheticName: "Test UMA Token",
      syntheticSymbol: "UMATEST",
      liquidationLiveness: "1000",
      collateralRequirement: { rawValue: toWei("1.5") },
      disputeBondPct: { rawValue: toWei("0.1") },
      sponsorDisputeRewardPct: { rawValue: toWei("0.1") },
      disputerDisputeRewardPct: { rawValue: toWei("0.1") }
    };

    identifierWhitelist = await IdentifierWhitelist.deployed();
    await identifierWhitelist.addSupportedIdentifier(constructorParams.priceFeedIdentifier, {
      from: accounts[0]
    });

    await ExpiringMultiParty.new(constructorParams);
  });
});