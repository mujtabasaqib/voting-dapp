//import * as anchor from '@coral-xyz/anchor'
import { BankrunProvider, startAnchor } from "anchor-bankrun";
import {BN, Program} from '@coral-xyz/anchor'
import {PublicKey} from '@solana/web3.js'
import {Votingdapp} from '../target/types/votingdapp' //imp 
//idl
const IDL = require('../target/idl/votingdapp.json'); //imp

const votingAddress = new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

describe('Voting Dapp Tests', () => {

  let context;
  let provider;
  let votingProgram: Program<Votingdapp>;

  beforeAll(async () => {
     context = await startAnchor("", [{name: "votingdapp", programId: votingAddress}], []); //imp
	   provider = new BankrunProvider(context); //imp

     votingProgram = new Program<Votingdapp>(
      IDL,
      provider
    )
  });

  it('Initialize Poll', async () => {
    await votingProgram.methods.initializePoll(
      new BN(1),
      new BN(0),
      new BN(1801037692),
      "Donald Trump",
      "Who is your favourite president?"
  ).rpc();

  const [pollAddress] = PublicKey.findProgramAddressSync(
    [new BN(1).toArrayLike(Buffer, "le", 8)],
    votingAddress
  );

  const poll = await votingProgram.account.pollAccount.fetch(pollAddress);
  //console.log(poll);

  expect(poll.pollDescription).toBe("Who is your favourite president?");

});

it('Initialize Candidate', async () => {
  await votingProgram.methods.initializeCandidate(
    new BN(1),
    "Donald Trump"
).rpc();

await votingProgram.methods.initializeCandidate(
  new BN(1),
  "Joe Biden"
).rpc();

const [candidateAddress] = PublicKey.findProgramAddressSync(
  [new BN(1).toArrayLike(Buffer, "le", 8), Buffer.from("Donald Trump")],
  votingAddress
);

const [candidateAddress1] = PublicKey.findProgramAddressSync(
  [new BN(1).toArrayLike(Buffer, "le", 8), Buffer.from("Joe Biden")],
  votingAddress
);

const candidate = await votingProgram.account.candidateAccount.fetch(candidateAddress);
//console.log(candidate);

const candidate1 = await votingProgram.account.candidateAccount.fetch(candidateAddress1);

expect(candidate.candidateName).toBe("Donald Trump");
expect(candidate1.candidateName).toBe("Joe Biden");

});


it('Vote', async () => {
  await votingProgram.methods.vote(
    new BN(1),
    "Donald Trump"
).rpc();


await votingProgram.methods.vote(
  new BN(1),
  "Joe Biden"
).rpc();

await votingProgram.methods.vote(
  new BN(1),
  "Donald Trump"
).rpc();

const [candidateAddress] = PublicKey.findProgramAddressSync(
  [new BN(1).toArrayLike(Buffer, "le", 8), Buffer.from("Donald Trump")],
  votingAddress
);

const [candidateAddress1] = PublicKey.findProgramAddressSync(
  [new BN(1).toArrayLike(Buffer, "le", 8), Buffer.from("Joe Biden")],
  votingAddress
);

const trump = await votingProgram.account.candidateAccount.fetch(candidateAddress);
console.log(trump);

const biden = await votingProgram.account.candidateAccount.fetch(candidateAddress1);
console.log(biden);

expect(Number(trump.candidateVotes)).toBe(2);
expect(Number(biden.candidateVotes)).toBe(1);

});


});
