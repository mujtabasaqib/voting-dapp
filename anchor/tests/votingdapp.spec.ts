import * as anchor from '@coral-xyz/anchor'
import { BankrunProvider, startAnchor } from "anchor-bankrun";
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'
import {Votingdapp} from '../target/types/votingdapp' //imp 
//idl
const IDL = require('../target/idl/votingdapp.json'); //imp

const votingAddress = new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

describe('Voting Dapp Tests', () => {
  it('Initialize Poll', async () => {
    const context = await startAnchor("", [{name: "voting", programId: votingAddress}], []); //imp
	  const provider = new BankrunProvider(context); //imp

    const votingProgram = new Program<Votingdapp>(
      IDL,
      provider
    )

    await votingProgram.methods.initializePoll(
      new anchor.BN(1),
      new anchor.BN(0),
      new anchor.BN(1801037692),
      "Donald Trump",
      "Who is your favourite president?"
  ).rpc();

  const [pollAddress] = await PublicKey.findProgramAddressSync(
    [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
    votingAddress
  )

  const poll = await votingProgram.account.pollAccount.fetch(pollAddress);

  expect(poll.pollDescription).toBe("Who is your favourite president?");

});
});
