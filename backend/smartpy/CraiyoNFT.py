import smartpy as sp
FA2 = sp.io.import_script_from_url("https://smartpy.io/templates/fa2_lib.py")

class CraiyoNft(
    FA2.Admin,
    FA2.MintNft,
    FA2.Fa2Nft
):
    def __init__(self, admin, metadata, token_metadata = {}, ledger = {}, policy = None, metadata_base = None):
        FA2.Fa2Nft.__init__(self, metadata, token_metadata = token_metadata, ledger = ledger, policy = policy, metadata_base = metadata_base)
        FA2.Admin.__init__(self, admin)

@sp.add_test(name="Hello World NFT")
def test():
    sc = sp.test_scenario()
    c1 = FA2.Fa2Nft(
        metadata = sp.utils.metadata_of_url("https://example.com"),
    )
    sc += c1
