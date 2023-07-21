# ZKMicrophone



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


