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
    def mint(self, action):
        sp.set_type(
            action,
            sp.TRecord(
                to_=sp.TAddress,
                cid=sp.TString,
            ).layout(("to_", "cid"))
        )
        token_id = sp.compute(self.data.last_token_id)
        micmap = sp.map(l = {
            "decimals" : sp.utils.bytes_of_string("%d" % 0),
            "name" : sp.utils.bytes_of_string("CraiyoNFT"),
            "symbol" : sp.utils.bytes_of_string("CYNFT"),
            "metadata_cid" : sp.utils.bytes_of_string("%s" % action.cid)
        })
        metadata = sp.record(token_id=token_id, token_info=micmap)
        self.data.token_metadata[token_id] = metadata
        self.data.ledger[token_id] = action.to_
        self.data.last_token_id += 1

    @sp.offchain_view(pure = True)
    def all_metadata_cids(self):
        sp.result(self.data.token_metadata)

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

        NFT0 = "Qmfoaksjdfoaksjdfokasjdofkija"
        NFT1 = "QM09dsf9ij91i342j0sfd123hrsf0"
        craiyoNft.mint(
            sp.record(
                to_  = alice.address,
                cid = NFT0
            )).run(sender = bob)
        craiyoNft.mint(
            sp.record(
                to_  = bob.address,
                cid = NFT1
            )).run(sender = alice)

        # viewing test for all cids
        sc.show(craiyoNft.all_metadata_cids())
        sc.show(craiyoNft.token_metadata(1))

if "templates" not in __name__:
    craiyoNft = CraiyoNft(
        metadata = sp.utils.metadata_of_url("https://example.com"),
    )

    core_test(craiyoNft)
