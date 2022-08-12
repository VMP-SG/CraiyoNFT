import smartpy as sp
FA2 = sp.io.import_script_from_url("https://smartpy.io/templates/fa2_lib.py")

class CraiyoNft(
    FA2.OnchainviewBalanceOf,
    FA2.OffchainviewTokenMetadata,
    FA2.Fa2Nft
):
    def __init__(self, metadata, token_metadata = {}, ledger = {}, policy = None, metadata_base = None):
        FA2.Fa2Nft.__init__(self, metadata, token_metadata = token_metadata, ledger = ledger, policy = policy, metadata_base = metadata_base)

    @sp.entry_point
    def mint(self, batch):
        sp.set_type(
            batch,
            sp.TList(
                sp.TRecord(
                    to_=sp.TAddress,
                    metadata=sp.TMap(sp.TString, sp.TBytes),
                ).layout(("to_", "metadata"))
            ),
        )
        with sp.for_("action", batch) as action:
            token_id = sp.compute(self.data.last_token_id)
            metadata = sp.record(token_id=token_id, token_info=action.metadata)
            self.data.token_metadata[token_id] = metadata
            self.data.ledger[token_id] = action.to_
            self.data.last_token_id += 1

def core_test(craiyoNft):

    @sp.add_test(name="Mint Test")
    def mint_test():
        sc = sp.test_scenario()
        sc.h1("FA2 Contract Name: " + "Mint Test")
        alice = sp.test_account("Alice")
        bob = sp.test_account("Bob")
        sc.h2("Accounts")
        sc.show([alice, bob])
        sc += craiyoNft

        NFT0 = FA2.make_metadata(
            name     = "Example FA2",
            decimals = 0,
            symbol   = "EFA2" )
        NFT1 = FA2.make_metadata(
            name     = "Example FA2",
            decimals = 0,
            symbol   = "EFA2-2" )
        craiyoNft.mint([
            sp.record(
                to_  = alice.address, # Who will receive the original mint
                metadata = NFT0
            )]).run(sender = bob)
        craiyoNft.mint([
            sp.record(
                to_  = bob.address,
                metadata = NFT1
            )]).run(sender = alice)

        sc.show(craiyoNft.token_metadata(1))

if "templates" not in __name__:
    craiyoNft = CraiyoNft(
        metadata = sp.utils.metadata_of_url("https://example.com"),
    )

    core_test(craiyoNft)
