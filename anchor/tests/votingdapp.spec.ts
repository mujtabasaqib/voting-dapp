//import * as anchor from '@coral-xyz/anchor'
import { BankrunProvider, startAnchor } from "anchor-bankrun";
import {BN, Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'
import {Votingdapp} from '../target/types/votingdapp' //imp 
//idl
const IDL = require('../target/idl/votingdapp.json'); //imp

const votingAddress = new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

describe('Voting Dapp Tests', () => {
  it('Initialize Poll', async () => {
    const context = await startAnchor("", [{name: "votingdapp", programId: votingAddress}], []); //imp
	  const provider = new BankrunProvider(context); //imp

    const votingProgram = new Program<Votingdapp>(
      IDL,
      provider
    )

    await votingProgram.methods.initializePoll(
      new BN(1),
      new BN(0),
      new BN(1801037692),
      "Donald Trump",
      "Who is your favourite president?"
  ).rpc();

  const [pollAddress] = PublicKey.findProgramAddressSync(
    [Buffer.from("poll"), new BN(1).toArrayLike(Buffer, "le", 8)],
    votingAddress
  );

  const poll = await votingProgram.account.pollAccount.fetch(pollAddress);
  console.log(poll);

  expect(poll.pollDescription).toBe("Who is your favourite president?");

});
});
