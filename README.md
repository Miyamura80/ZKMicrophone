# ZKMicrophone

![ZK Microphone - Hardware Microphone](./microphone.png)

## Overview

🎙🔒 ZK Microphone: Trusted audio in the age of deepfakes 🔒🎙 Generative AI is a threat to society. It enables disinformation, manipulation, and political subversion. We've built the world's first attested microphone and used ZK-SNARKs to protect authenticity and privacy.

## How it's made

Our project is a truly full-stack solution with a hardware and software layer interplay. 

On the hardware layer, we store a secret key for the ECDSA signature scheme on a secure enclave within an embedded circuit. For our proof-of-concept we use a Raspberry Pi which stores the secret key and this never leaves the Pi. Audio is recorded on an external microphone and signed using the secret key all on the pi. We use .wav files since they are simple byte-arrays. The wav file and signature can then be loaded onto the main computer, ready for edit. 

On the main computer (i.e. software layer), each audio along with the digital hardware signature can be edited with our software. Each edit is accompanied by a ZK-SNARK proof written in Noir. The audio edit operations with the SNARK proof is privacy preserving, in that it does not reveal any information about the original digitally, and we operate within the audio hash space for fast proof generation, without compromising security properties. 

We then store the proof, signature and the edited audio on IPFS, and can verify the signature and the proof on a wide range of L1/L2s. This allows third-party users to verify that the audio was edited whilst preserving the hardware signature. 

## Architecture

$Audio::\text{.wav file}$
$AudioTransform::(Audio,Signature)\rightarrow (Audio,Signature)$


$f_1::Audio\rightarrow(Audio,Signature)$
$\text{BEGIN }f_1(a):$
$s \leftarrow E_{sk_A}(h(a))$
$\text{return } (a,s)$


$f_2::(Audio,Signature,AudioTransform)\rightarrow(Audio,Proof,Signature,Audio)$
$\text{BEGIN }f_2(a,s,g):$
$p,a'\leftarrow proof(g(a,s))$
$\text{return } (a,p,s,a')$


(ON-CHAIN) Verifying authenticity of Hardware Signature:
$f_3::(Audio,Signature)\rightarrow Bool$
$\text{BEGIN }f_3(a,s):$
$\text{return } D_{pk_A}(s)==h(a)$


(ON-CHAIN) Verifying authenticity of Hardware Signature:
$f_4::(Audio,Proof,Signature,Audio)\rightarrow Bool$
$\text{BEGIN }f_4(a,p,s,a'):$
$\text{return } verify(a,p,s,a')$


