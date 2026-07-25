## probabilidade-para-ia
- OK

## algebra-linear-essencial-ia
- OK

## gradientes-otimizacao-intuitiva
- OK

## teoria-da-informacao-entropia
- OK

## o-que-e-aprendizado-de-maquina
- OK

## paradigmas-aprendizado-supervisionado-nao-supervisionado-reforco
- OK

## treino-validacao-teste-vazamento-dados
- OK

## overfitting-underfitting-regularizacao
- OK

## regressao-linear-e-logistica
- OK

## arvores-ensembles-agregacao
- OK

## metricas-classificacao-precisao-recall-f1-roc
- MAJOR: interactions.tsx:279-344 — o simulador de threshold desenhava o limiar como linha vertical sobre o índice dos exemplos, embora o corte real ocorra no eixo do score; isso ensinava a mecânica errada do threshold. Represente o corte como linha horizontal no nível do score e preserve a leitura de TP, FP, precisão e recall a partir desse eixo.
- MINOR: interactions.tsx:122-166 — a curva ROC amostrava thresholds sem alcançar o extremo inferior, então o exemplo não chegava ao endpoint (1,1) quando todos os casos deveriam poder ser marcados como positivos. Inclua os extremos 0 e 1 para mostrar a ROC completa.

## vies-variancia-erro-irredutivel
- OK

## redes-neurais-do-zero
- OK

## funcoes-de-ativacao
- OK

## funcoes-de-perda
- MAJOR: interactions.tsx:12-93 — as interações de MSE vs cross-entropy e de paisagem da loss diziam trabalhar com "probabilidade da classe correta", mas antes misturavam isso com a probabilidade da classe 1 quando o alvo mudava, invertendo a leitura do eixo em parte dos casos. Parametrize diretamente p(classe correta), ou relabele explicitamente o controle e o gráfico, para que a semântica ensinada coincida com a conta mostrada.

## backpropagation
- OK

## otimizadores-sgd-momentum-adam
- MAJOR: content.ts:176-199; interactions.tsx:108-150 — a explicação operacional de Adam estava reduzida a médias móveis cruas, sem explicitar a correção de viés dos primeiros passos, que faz parte do algoritmo padrão. Mostre m̂ e v̂, ou pelo menos mencione explicitamente a correção de viés, para que o mecanismo ensinado corresponda ao Adam clássico.

## inicializacao-batch-norm-estabilidade
- MAJOR: content.ts:169-173 — a fórmula simplificada de Xavier aparecia como 1/sqrt(fan), o que apaga a dependência correta de fan_in e fan_out e pode induzir comparação errada com He. Explicite a variância-alvo de Glorot/Xavier (aprox. 2/(fan_in + fan_out), com pequenas variações conforme a distribuição usada) e mantenha He ligado a 2/fan_in.

## cnns-redes-convolucionais
- OK

## regularizacao-deep-learning
- OK

## transfer-learning-fine-tuning-redes
- OK
