const allDatasets = [
  {
    "id": 1,
    "nome": "BigEarthNet v2.0 (reBEN)",
    "url": "https://bigearth.net/",
    "conteudo": "549.488 pares de recortes Sentinel-1 (SAR) e Sentinel-2, com mapa de referÃªncia por pixel e rÃ³tulos multirrÃ³tulo de cobertura do solo (19 classes, CORINE 2018). Dez paÃ­ses europeus, jun/2017 a mai/2018.",
    "gratuito": "Sim",
    "acesso": "Download aberto no Zenodo (registro 10891137).",
    "licenca": "Community Data License Agreement â Permissive 1.0 (CDLA-Permissive-1.0)",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "~59 GiB (Sentinel-2) + ~51 GiB (Sentinel-1), formato tar.zst",
    "citacao": "Clasen et al., reBEN: Refined BigEarthNet Dataset for Remote Sensing Image Analysis, IEEE IGARSS 2025 (arXiv:2407.03653).",
    "obs": "Alguns recortes tÃªm neve, nuvem ou sombra; a pÃ¡gina recomenda excluÃ­-los em classificaÃ§Ã£o de cenas. Cobre sÃ³ a Europa.",
    "confianca": "Confirmado",
    "fonte": "https://bigearth.net/",
    "problemas": [
      "Radar, SAR e sensoriamento remoto"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecÃ§Ã£o",
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 2,
    "nome": "SEN12MS",
    "url": "https://mediatum.ub.tum.de/1474000",
    "conteudo": "180.662 trincas de recortes: Sentinel-1 SAR dupla polarizaÃ§Ã£o (VV e VH), Sentinel-2 com 13 bandas e mapas de cobertura do solo MODIS (IGBP, LCCS). GeoTIFF de 16 bits, quatro estaÃ§Ãµes do ano, todos os continentes.",
    "gratuito": "Sim",
    "acesso": "Download no servidor da TUM (mediaTUM).",
    "licenca": "NÃ£o confirmada nesta sessÃ£o. Confira o campo de licenÃ§a do registro mediaTUM e o README do pacote.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Schmitt et al., SEN12MS, ISPRS Annals IV-2/W7, 2019 (arXiv:1906.07789).",
    "obs": "A pÃ¡gina do mediaTUM bloqueou a consulta automÃ¡tica.",
    "confianca": "Parcial",
    "fonte": "https://arxiv.org/abs/1906.07789",
    "problemas": [
      "Radar, SAR e sensoriamento remoto"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecÃ§Ã£o",
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 3,
    "nome": "SpaceNet (Registry of Open Data on AWS)",
    "url": "https://registry.opendata.aws/spacenet/",
    "conteudo": "Imagens de satÃ©lite de alta resoluÃ§Ã£o com feiÃ§Ãµes mapeadas (prÃ©dios, estradas, estradas e prÃ©dios alagados, desenvolvimento urbano multitemporal). Inclui dados do fMoW da IARPA. Atualizado a cada trimestre.",
    "gratuito": "Sim",
    "acesso": "Bucket S3 pÃºblico (s3://spacenet-dataset), sem conta AWS: aws s3 ls --no-sign-request.",
    "licenca": "Variada por conjunto (ver spacenet.ai/datasets). A pÃ¡gina do registro nÃ£o nomeia uma licenÃ§a Ãºnica.",
    "classe": "NÃ£o confirmada",
    "comercial": "Depende do conjunto",
    "tamanho": "",
    "citacao": "",
    "obs": "Confira a licenÃ§a de cada desafio antes de reutilizar. Cite a data de acesso e a URL do registro.",
    "confianca": "Parcial",
    "fonte": "https://registry.opendata.aws/spacenet/",
    "problemas": [
      "Radar, SAR e sensoriamento remoto"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecÃ§Ã£o",
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 4,
    "nome": "Copernicus Sentinel (Data Space Ecosystem)",
    "url": "https://dataspace.copernicus.eu/",
    "conteudo": "Dados das missÃµes Sentinel (inclui Sentinel-1 SAR e Sentinel-2 multiespectral), serviÃ§os e dados de contribuiÃ§Ã£o. NavegaÃ§Ã£o e busca pelo Copernicus Browser.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Registro de usuÃ¡rio exigido para baixar. Contas mÃºltiplas para burlar cotas violam os termos.",
    "licenca": "Acesso aos dados Sentinel em base livre, completa e aberta, regido pelo Aviso Legal do Copernicus Sentinel (documento Ã  parte).",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "",
    "citacao": "",
    "obs": "Outros conteÃºdos do portal (nÃ£o Sentinel) sÃ£o sÃ³ para uso nÃ£o comercial. O texto exato de atribuiÃ§Ã£o estÃ¡ no Aviso Legal, que nÃ£o consegui ler (PDF).",
    "confianca": "Confirmado",
    "fonte": "https://dataspace.copernicus.eu/terms-and-conditions",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "RadiaÃ§Ã£o e ambiente espacial e atmosfÃ©rico"
    ],
    "tecnicas": [
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 5,
    "nome": "CBERS-4 e CBERS-4A no AWS (INPE)",
    "url": "https://registry.opendata.aws/cbers/",
    "conteudo": "Imagens dos satÃ©lites sino-brasileiros CBERS-4 (MUX, AWFI, PAN5M, PAN10M) e CBERS-4A (MUX, WFI, WPM), nÃ­vel 4 ortorretificado, em Cloud Optimized GeoTIFF. Atualizado diariamente. Imagens gravadas e processadas pelo INPE.",
    "gratuito": "Sim",
    "acesso": "Buckets S3 pÃºblicos (brazil-eosats) e catÃ¡logo STAC, sem conta AWS.",
    "licenca": "A pÃ¡gina aponta para Creative Commons CC BY-SA 3.0 (link, sem nomear no texto).",
    "classe": "Aberta com compartilhamento igual",
    "comercial": "Sim, com atribuiÃ§Ã£o e compartilhamento igual",
    "tamanho": "Cloud Optimized GeoTIFF; volume total nÃ£o informado",
    "citacao": "",
    "obs": "Dado nacional e Ãºtil para trabalhos de sensoriamento remoto no ITA/INPE. Entrada do registro mantida por Frederico Liporace; a pÃ¡gina nÃ£o descreve o INPE como mantenedor.",
    "confianca": "Confirmado",
    "fonte": "https://registry.opendata.aws/cbers/",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "SatÃ©lites e missÃµes espaciais"
    ],
    "tecnicas": [
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 6,
    "nome": "TerraBrasilis: PRODES e DETER (INPE)",
    "url": "https://terrabrasilis.dpi.inpe.br/",
    "conteudo": "Mapas anuais de supressÃ£o de vegetaÃ§Ã£o nativa (PRODES) nos biomas brasileiros e na AmazÃ´nia Legal, alertas quase em tempo real (DETER) para AmazÃ´nia e Cerrado, mapas de vegetaÃ§Ã£o do Cerrado e painÃ©is de focos de queimada.",
    "gratuito": "Sim",
    "acesso": "Download de vetores e rasters; DETER em Shapefile.",
    "licenca": "Creative Commons AtribuiÃ§Ã£o-CompartilhaIgual 4.0 (CC BY-SA 4.0), segundo a pÃ¡gina. HÃ¡ uma pÃ¡gina Ã  parte, 'CitaÃ§Ãµes e LicenÃ§a de Uso'.",
    "classe": "Aberta com compartilhamento igual",
    "comercial": "Sim, com atribuiÃ§Ã£o e compartilhamento igual",
    "tamanho": "",
    "citacao": "",
    "obs": "A cÃ³pia que consultei exibia conteÃºdo estranho (anÃºncios) em uma seÃ§Ã£o do painel. Acesse pelo navegador e confira se a pÃ¡gina estÃ¡ Ã­ntegra. Dados experimentais de DETER (Pantanal e Ã¡reas nÃ£o florestais) podem mudar.",
    "confianca": "Confirmado",
    "fonte": "https://terrabrasilis.dpi.inpe.br/",
    "problemas": [
      "Radar, SAR e sensoriamento remoto"
    ],
    "tecnicas": [],
    "temas": [
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 7,
    "nome": "xView (DIUx/NGA)",
    "url": "http://xviewdataset.org/",
    "conteudo": "Imagens de satÃ©lite com 0,3 m de resoluÃ§Ã£o, 1 milhÃ£o de objetos em 60 classes, 1.415 kmÂ². Foco em resposta a desastres. AnotaÃ§Ã£o por caixas delimitadoras.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Cadastro no desafio xView 2018 e aceite dos Termos e CondiÃ§Ãµes.",
    "licenca": "A pÃ¡gina consultada nÃ£o declara a licenÃ§a; remete a 'Terms and Conditions' (nÃ£o lidos).",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Confira os termos antes de usar. A pÃ¡gina fala em imagens de satÃ©lite sem dizer o sensor; pelo que sei Ã© imagem Ã³ptica, nÃ£o SAR (nÃ£o confirmado nesta sessÃ£o).",
    "confianca": "Parcial",
    "fonte": "http://xviewdataset.org/",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "Defesa e guerra eletrÃ´nica"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecÃ§Ã£o"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 8,
    "nome": "SAMPLE (AFRL): SAR sintÃ©tico e medido pareado",
    "url": "https://github.com/benjaminlewis-afrl/SAMPLE_dataset_public",
    "conteudo": "Imagens SAR medidas do conjunto MSTAR, cada uma pareada com uma imagem SAR simulada. VersÃ£o pÃºblica cobre azimutes de 10Â° a 80Â°. Arquivos .mat e PNG.",
    "gratuito": "Sim",
    "acesso": "RepositÃ³rio pÃºblico no GitHub.",
    "licenca": "Distribution A: aprovado para divulgaÃ§Ã£o pÃºblica, distribuiÃ§Ã£o ilimitada. NÃ£o nomeia licenÃ§a de software ou de dados.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Lewis et al., SPIE Proc. 10987, 2019, doi:10.1117/12.2523460.",
    "obs": "Ãtil para reconhecimento automÃ¡tico de alvos SAR e transferÃªncia de simulaÃ§Ã£o para dado real.",
    "confianca": "Parcial",
    "fonte": "https://github.com/benjaminlewis-afrl/SAMPLE_dataset_public",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "Defesa e guerra eletrÃ´nica"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecÃ§Ã£o",
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 9,
    "nome": "MSTAR (AFRL/DARPA)",
    "url": "https://www.sdms.afrl.af.mil/index.php?collection=mstar",
    "conteudo": "Conjunto clÃ¡ssico de imagens SAR de veÃ­culos terrestres para reconhecimento automÃ¡tico de alvos, dos anos 1990. A literatura o descreve como limitado a poucas dezenas de milhares de recortes e com acurÃ¡cias acima de 99% de classificaÃ§Ã£o.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "Hospedado no portal SDMS do AFRL. A pÃ¡gina nÃ£o abriu nesta sessÃ£o (conexÃ£o reiniciada).",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Sucessores maiores citados na literatura: NUDT4MSTAR (>190.000 imagens, 40 tipos de alvo) e ATRNet-STAR (40 categorias de veÃ­culos). NÃ£o verifiquei a licenÃ§a deles.",
    "confianca": "NÃ£o verificado",
    "fonte": "https://www.preprints.org/manuscript/202308.0837",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "Defesa e guerra eletrÃ´nica"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecÃ§Ã£o",
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 10,
    "nome": "CatÃ¡logo de imagens do INPE (CBERS, Amazonia-1, Landsat e outros)",
    "url": "http://www.dgi.inpe.br/catalogo/",
    "conteudo": "CatÃ¡logo para busca e download de imagens de satÃ©lite distribuÃ­das pelo INPE.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "A pÃ¡gina consultada sÃ³ mostrou o tÃ­tulo; nÃ£o consegui ler condiÃ§Ãµes de acesso nem polÃ­tica de uso.",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Use o registro CBERS no AWS (acima) como alternativa com condiÃ§Ãµes documentadas.",
    "confianca": "NÃ£o verificado",
    "fonte": "http://www.dgi.inpe.br/catalogo/",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "SatÃ©lites e missÃµes espaciais"
    ],
    "tecnicas": [],
    "temas": [
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 11,
    "nome": "EMBRACE/INPE: cintilaÃ§Ã£o ionosfÃ©rica (S4 e ÏÏ)",
    "url": "https://embracedata.inpe.br/scintillation/readme_scintillation.html",
    "conteudo": "Dados de cintilaÃ§Ã£o (Ã­ndice S4 e ÏÏ) de receptores GNSS de vÃ¡rias redes no Brasil: arquivos por ano, estaÃ§Ã£o e dia (27 colunas, S4 total na coluna 5), mapas gradeados S4 e ÏÏ e um mapa quase em tempo real (10 min).",
    "gratuito": "Sim",
    "acesso": "Download direto no servidor de dados do EMBRACE (readme v2.0 de 01/01/2026; mapas v1.0 de 2026-05-01).",
    "licenca": "LicenÃ§a nÃ£o declarada nos readmes. Exige agradecimento Ã s redes (INCT/UNESP, EMBRACE/INPE/IBGE e NSSC/CAS) e aos financiadores (CNPq, FAPESP, CAPES).",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Tema que aparece em vÃ¡rios trabalhos do acervo do ITA (GNSS e cintilaÃ§Ã£o em baixas latitudes). A pÃ¡gina principal do programa nÃ£o abriu (erro de certificado).",
    "confianca": "Parcial",
    "fonte": "https://embracedata.inpe.br/scintillation/readme_scintillation.html",
    "problemas": [
      "NavegaÃ§Ã£o, GNSS e ionosfera",
      "RadiaÃ§Ã£o e ambiente espacial e atmosfÃ©rico"
    ],
    "tecnicas": [
      "ExperimentaÃ§Ã£o, ensaios e instrumentaÃ§Ã£o"
    ],
    "temas": [
      "GNSS e ionosfera"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 12,
    "nome": "RBMC (IBGE): Rede Brasileira de Monitoramento ContÃ­nuo",
    "url": "https://www.ibge.gov.br/en/geosciences/geodetic-positioning/geodetic-networks/19213-brazilian-network-for-continuous-monitoring-of-the-gnss-systems.html",
    "conteudo": "ObservaÃ§Ãµes GNSS contÃ­nuas de estaÃ§Ãµes brasileiras em RINEX 2 e 3 (15 s; multiconstelaÃ§Ã£o desde 30/08/2018), com efemÃ©rides em diretÃ³rio separado. CompactaÃ§Ã£o Hatanaka (.crx) e gzip.",
    "gratuito": "Sim",
    "acesso": "FTP do IBGE (geoftp.ibge.gov.br) e portal web.",
    "licenca": "Gratuito segundo as fontes consultadas, sem licenÃ§a formal declarada.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "Cerca de 150 estaÃ§Ãµes (dado de 2019, pode estar desatualizado)",
    "citacao": "",
    "obs": "InformaÃ§Ãµes vieram de resultados de busca, nÃ£o de leitura direta da pÃ¡gina do IBGE. Confirme os caminhos do FTP antes de automatizar.",
    "confianca": "Parcial",
    "fonte": "https://www.ibge.gov.br/en/geosciences/geodetic-positioning/geodetic-networks/19213-brazilian-network-for-continuous-monitoring-of-the-gnss-systems.html",
    "problemas": [
      "NavegaÃ§Ã£o, GNSS e ionosfera"
    ],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [
      "GNSS e ionosfera",
      "NavegaÃ§Ã£o, robÃ³tica e fusÃ£o sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 13,
    "nome": "IGS: dados e produtos GNSS (via CDDIS e files.igs.org)",
    "url": "https://igs.org/data/",
    "conteudo": "ObservaÃ§Ãµes GNSS diÃ¡rias (RINEX 2 e 3, 30 s), horÃ¡rias, de alta taxa, MGEX e em tempo real, mais Ã³rbitas e relÃ³gios precisos, quadro de referÃªncia, ionosfera, troposfera e vieses de cÃ³digo.",
    "gratuito": "Sim",
    "acesso": "Acesso aberto desde 1994 via arquivo do CDDIS e servidor HTTPS files.igs.org/pub. A pÃ¡gina nÃ£o menciona cadastro.",
    "licenca": "Regido pelo documento 'Data and Product Disclaimer and Terms of Use' do IGS (PDF nÃ£o lido).",
    "classe": "Termos prÃ³prios ou acesso controlado",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Registro de usuÃ¡rio (Earthdata Login) pode ser exigido no CDDIS; a pÃ¡gina do IGS nÃ£o trata disso.",
    "confianca": "Parcial",
    "fonte": "https://igs.org/data/",
    "problemas": [
      "NavegaÃ§Ã£o, GNSS e ionosfera"
    ],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [
      "GNSS e ionosfera"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 14,
    "nome": "Google Smartphone Decimeter Challenge (GNSS bruto de celulares)",
    "url": "https://www.kaggle.com/competitions/smartphone-decimeter-2022",
    "conteudo": "MediÃ§Ãµes GNSS brutas de smartphones Android (RINEX e logs do GnssLogger), dados de sensores e verdade terrestre de alta precisÃ£o. EdiÃ§Ã£o de 2021: 73 conjuntos de treino e 48 de teste; ediÃ§Ãµes 2023â2024 acrescentam mais de 150 trajetos.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Via Kaggle (conta) e pÃ¡gina g.co/gnssTools.",
    "licenca": "LicenÃ§a nÃ£o confirmada nesta sessÃ£o. Veja as abas Data e Rules do Kaggle.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A regra do desafio permite dados externos desde que pÃºblicos e gratuitos para todos.",
    "confianca": "Parcial",
    "fonte": "https://www.ion.org/gnss/googlecompetition.cfm",
    "problemas": [
      "NavegaÃ§Ã£o, GNSS e ionosfera"
    ],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [
      "GNSS e ionosfera",
      "NavegaÃ§Ã£o, robÃ³tica e fusÃ£o sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 15,
    "nome": "EuRoC MAV (ETH Zurich)",
    "url": "https://projects.asl.ethz.ch/datasets/euroc-mav/",
    "conteudo": "Datasets visual-inerciais coletados a bordo de um micro-veÃ­culo aÃ©reo: imagens estÃ©reo, IMU sincronizada e verdade de movimento e estrutura.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "Hospedado na ETH Research Collection (DOI 10.3929/ethz-b-000690084).",
    "licenca": "NÃ£o confirmada. Veja o campo de direitos do registro na ETH Research Collection.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Burri et al., The EuRoC micro aerial vehicle datasets, IJRR, 2016.",
    "obs": "ReferÃªncia padrÃ£o para odometria visual-inercial e SLAM.",
    "confianca": "Parcial",
    "fonte": "https://projects.asl.ethz.ch/datasets/euroc-mav/",
    "problemas": [
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos",
      "NavegaÃ§Ã£o, GNSS e ionosfera"
    ],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [
      "NavegaÃ§Ã£o, robÃ³tica e fusÃ£o sensorial",
      "VANTs e sistemas aÃ©reos autÃ´nomos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 16,
    "nome": "UZH-FPV Drone Racing",
    "url": "https://fpv.ifi.uzh.ch/",
    "conteudo": "Voos agressivos de drone de corrida: imagens e IMU de uma placa Snapdragon Flight, verdade terrestre de rastreador a laser Leica Nova MS60 e eventos de cÃ¢mera mDAVIS 346. Mais de 27 sequÃªncias e mais de 10 km. AcrÃ©scimo de sequÃªncias 'SplitS' em dez/2023.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "PÃ¡gina do projeto.",
    "licenca": "NÃ£o encontrei a licenÃ§a nas fontes consultadas.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Delmerico et al., Are We Ready for Autonomous Drone Racing? The UZH-FPV Drone Racing Dataset, ICRA 2019.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://fpv.ifi.uzh.ch/",
    "problemas": [
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos"
    ],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [
      "VANTs e sistemas aÃ©reos autÃ´nomos",
      "NavegaÃ§Ã£o, robÃ³tica e fusÃ£o sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 17,
    "nome": "Mid-Air (Universidade de LiÃ¨ge)",
    "url": "https://midair.ulg.ac.be/",
    "conteudo": "Dataset sintÃ©tico de voos de drone a muito baixa altitude: 79 minutos em 54 trajetÃ³rias de igual duraÃ§Ã£o, com normais de superfÃ­cie, profundidade, semÃ¢ntica de objetos e disparidade estÃ©reo.",
    "gratuito": "Sim",
    "acesso": "Download pÃºblico no site do dataset.",
    "licenca": "NÃ£o declarada nas fontes consultadas (a pÃ¡gina institucional sÃ³ traz aviso geral de direitos autorais).",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Fonder e Van Droogenbroeck, Mid-Air, CVPR Workshops 2019.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://openaccess.thecvf.com/content_CVPRW_2019/html/UAVision/Fonder_Mid-Air_A_Multi-Modal_Dataset_for_Extremely_Low_Altitude_Drone_Flights_CVPRW_2019_paper.html",
    "problemas": [
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "VANTs e sistemas aÃ©reos autÃ´nomos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 18,
    "nome": "TartanAir (CMU AirLab)",
    "url": "https://theairlab.org/tartanair-dataset/",
    "conteudo": "Dataset sintÃ©tico de SLAM visual em ambientes simulados difÃ­ceis, com RGB, profundidade, segmentaÃ§Ã£o e trajetÃ³rias, para testar limites de SLAM visual.",
    "gratuito": "Sim",
    "acesso": "Scripts de download no GitHub (castacks/tartanair_tools).",
    "licenca": "NÃ£o confirmada. Uma cÃ³pia no Azure Open Datasets cita licenÃ§a MIT, mas parece se referir ao projeto, nÃ£o Ã s imagens.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Wang et al., TartanAir: A Dataset to Push the Limits of Visual SLAM, IROS 2020.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://ri.cmu.edu/publications/tartanair-a-dataset-to-push-the-limits-of-visual-slam",
    "problemas": [
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [
      "NavegaÃ§Ã£o, robÃ³tica e fusÃ£o sensorial",
      "VANTs e sistemas aÃ©reos autÃ´nomos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 19,
    "nome": "VisDrone (Universidade de Tianjin)",
    "url": "https://github.com/VisDrone/VisDrone-Dataset",
    "conteudo": "Imagens e vÃ­deos feitos por drones para detecÃ§Ã£o e rastreamento de objetos, maior conjunto do tipo Ã  Ã©poca do desafio. Copyright reservado Ã  equipe AISKYEYE (Tianjin University).",
    "gratuito": "Sim",
    "acesso": "RepositÃ³rio oficial do dataset.",
    "licenca": "Conflitante entre espelhos: alguns citam CC BY-NC-SA 3.0, outros cc-by-sa-3.0. O repositÃ³rio oficial deve prevalecer.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Se o uso for comercial ou com parceiro industrial, confirme os termos no repositÃ³rio oficial.",
    "confianca": "Parcial",
    "fonte": "https://arxiv.org/abs/2001.06303",
    "problemas": [
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos",
      "Defesa e guerra eletrÃ´nica"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecÃ§Ã£o",
      "VANTs e sistemas aÃ©reos autÃ´nomos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 20,
    "nome": "KITTI Vision Benchmark Suite",
    "url": "https://www.cvlibs.net/datasets/kitti/",
    "conteudo": "Dados de conduÃ§Ã£o autÃ´noma (cÃ¢meras, LiDAR, GPS/IMU) e benchmarks de detecÃ§Ã£o, rastreamento, odometria e estÃ©reo.",
    "gratuito": "Sim",
    "acesso": "Download no site (algumas partes exigem registro).",
    "licenca": "Creative Commons AtribuiÃ§Ã£o-NÃ£oComercial-CompartilhaIgual 3.0 (CC BY-NC-SA 3.0)",
    "classe": "SÃ³ pesquisa ou nÃ£o comercial",
    "comercial": "NÃ£o",
    "tamanho": "",
    "citacao": "",
    "obs": "O site oficial declara a licenÃ§a; AWS Open Data e outras fontes concordam. NÃ£o vale para fins comerciais.",
    "confianca": "Confirmado",
    "fonte": "https://www.cvlibs.net/datasets/kitti/",
    "problemas": [
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos",
      "NavegaÃ§Ã£o, GNSS e ionosfera"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [
      "NavegaÃ§Ã£o, robÃ³tica e fusÃ£o sensorial",
      "Aprendizado profundo para imagens e detecÃ§Ã£o"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 21,
    "nome": "nuScenes (Motional)",
    "url": "https://www.nuscenes.org/",
    "conteudo": "Dataset multimodal de conduÃ§Ã£o autÃ´noma (cÃ¢meras, LiDAR, radar) com anotaÃ§Ãµes 3D.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Criar conta e aceitar os Termos de Uso na pÃ¡gina de download.",
    "licenca": "Descrita como CC BY-NC-SA 4.0 com modificaÃ§Ãµes nos Termos de Uso do nuScenes. Os termos oficiais valem.",
    "classe": "SÃ³ pesquisa ou nÃ£o comercial",
    "comercial": "NÃ£o",
    "tamanho": "",
    "citacao": "",
    "obs": "InformaÃ§Ã£o veio de fontes secundÃ¡rias; o texto oficial de termos nÃ£o foi lido.",
    "confianca": "Parcial",
    "fonte": "https://arxiv.org/pdf/1903.11027",
    "problemas": [
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecÃ§Ã£o",
      "NavegaÃ§Ã£o, robÃ³tica e fusÃ£o sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 22,
    "nome": "Waymo Open Dataset",
    "url": "https://waymo.com/open/",
    "conteudo": "Dados de conduÃ§Ã£o autÃ´noma da Waymo (sensores, anotaÃ§Ãµes) para percepÃ§Ã£o e prediÃ§Ã£o.",
    "gratuito": "Sim",
    "acesso": "Aceite do Waymo Dataset License Agreement for Non-Commercial Use (mar/2025) ao baixar ou usar.",
    "licenca": "LicenÃ§a prÃ³pria sÃ³ para fins nÃ£o comerciais, nÃ£o exclusiva, pessoal e nÃ£o transferÃ­vel. Trabalhos derivados exigem a linha de crÃ©dito prevista.",
    "classe": "SÃ³ pesquisa ou nÃ£o comercial",
    "comercial": "NÃ£o",
    "tamanho": "",
    "citacao": "",
    "obs": "Exclui trabalho voltado a litÃ­gio, licenciamento ou execuÃ§Ã£o de direitos. Trechos pequenos podem ser publicados para ilustraÃ§Ã£o. HÃ¡ clÃ¡usulas sobre 'sistemas de produÃ§Ã£o' que nÃ£o consegui ler por completo.",
    "confianca": "Confirmado",
    "fonte": "https://waymo.com/open/terms/",
    "problemas": [
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecÃ§Ã£o",
      "NavegaÃ§Ã£o, robÃ³tica e fusÃ£o sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 23,
    "nome": "RoboCup Small Size League: logs de partidas",
    "url": "https://ssl.robocup.org/game-logs/",
    "conteudo": "Logs de partidas oficiais da liga, com mensagens ProtoBuf temporizadas do ssl-vision, do game-controller e de produtores de vision-tracker. Formato SSL_LOG_FILE v1 (timestamp em ns, tipo e payload).",
    "gratuito": "Sim",
    "acesso": "Logs pÃºblicos; locais de armazenamento listados na pÃ¡gina 'Collected Data'. Ferramentas: ssl-go-tools (mantido) e ssl-logtools (legado).",
    "licenca": "NÃ£o declarada.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "NÃ£o hÃ¡ um download consolidado Ãºnico; links antigos de times podem estar mortos. O acervo do ITA tem trabalhos de futebol de robÃ´s.",
    "confianca": "Parcial",
    "fonte": "https://ssl.robocup.org/game-logs/",
    "problemas": [
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos"
    ],
    "tecnicas": [
      "Aprendizado por reforÃ§o e agentes",
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [
      "Aprendizado por reforÃ§o e robÃ³tica inteligente",
      "NavegaÃ§Ã£o, robÃ³tica e fusÃ£o sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 24,
    "nome": "NASA PCoE: C-MAPSS e Turbofan Degradation Simulation-2",
    "url": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "conteudo": "DegradaÃ§Ã£o simulada de motores turbofan em vÃ¡rios modos de falha e condiÃ§Ãµes de operaÃ§Ã£o (C-MAPSS) e trajetÃ³rias run-to-failure de uma frota sob condiÃ§Ãµes reais de voo (versÃ£o 2).",
    "gratuito": "Sim",
    "acesso": "Download direto na pÃ¡gina (marcado 'Available'). O desafio PHM08 exige contato com a NASA.",
    "licenca": "Sem licenÃ§a declarada. 'Users employ the data at their own risk'; pede-se agradecer ao repositÃ³rio e aos doadores dos dados.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "ReferÃªncia para prognÃ³stico de vida Ãºtil remanescente (RUL). RepositÃ³rio espelhado em data.phmsociety.org/nasa/.",
    "confianca": "Confirmado",
    "fonte": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "problemas": [
      "Aeronaves, voo e trÃ¡fego aÃ©reo"
    ],
    "tecnicas": [
      "Confiabilidade, risco e seguranÃ§a de sistemas",
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [
      "Engenharia de sistemas e seguranÃ§a (STPA)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 25,
    "nome": "NASA ASRS: Aviation Safety Reporting System",
    "url": "https://asrs.arc.nasa.gov/search/database.html",
    "conteudo": "Maior repositÃ³rio de relatos voluntÃ¡rios e confidenciais de seguranÃ§a da aviaÃ§Ã£o (pilotos, controladores, mecÃ¢nicos, comissÃ¡rios, despachantes): narrativas anonimizadas e campos codificados por analistas.",
    "gratuito": "Sim (a pÃ¡gina nÃ£o menciona custo)",
    "acesso": "Busca online; exporta para Word, Excel (.xls) ou CSV, no mÃ¡ximo 10.000 registros por download.",
    "licenca": "Termos formais nÃ£o listados na pÃ¡gina. Remete a 'Requesting ASRS Data'.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A NASA nÃ£o verifica nem valida os relatos. Bom para mineraÃ§Ã£o de texto e anÃ¡lise de fatores humanos. Cobertura temporal nÃ£o informada na pÃ¡gina.",
    "confianca": "Parcial",
    "fonte": "https://asrs.arc.nasa.gov/search/database.html",
    "problemas": [
      "Aeronaves, voo e trÃ¡fego aÃ©reo"
    ],
    "tecnicas": [
      "Confiabilidade, risco e seguranÃ§a de sistemas",
      "Conhecimento, mineraÃ§Ã£o de dados e lÃ³gica nebulosa"
    ],
    "temas": [
      "Engenharia de sistemas e seguranÃ§a (STPA)",
      "RadiaÃ§Ã£o cÃ³smica e aeronaves"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 26,
    "nome": "NTSB: banco de dados de aviaÃ§Ã£o (acidentes e incidentes)",
    "url": "https://data.ntsb.gov/avdata",
    "conteudo": "Banco de acidentes e incidentes de aviaÃ§Ã£o civil investigados pelo NTSB, distribuÃ­do em arquivos MDB.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "A pÃ¡gina consultada mostrou sÃ³ o diretÃ³rio 'MDB Download Directory'; o texto descritivo nÃ£o foi legÃ­vel.",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "DescriÃ§Ã£o por conhecimento prÃ©vio; confirme perÃ­odo, formato e termos no site.",
    "confianca": "NÃ£o verificado",
    "fonte": "https://data.ntsb.gov/avdata",
    "problemas": [
      "Aeronaves, voo e trÃ¡fego aÃ©reo"
    ],
    "tecnicas": [
      "Confiabilidade, risco e seguranÃ§a de sistemas"
    ],
    "temas": [
      "Engenharia de sistemas e seguranÃ§a (STPA)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 27,
    "nome": "OpenSky Network (ADS-B e Mode S)",
    "url": "https://opensky-network.org/data",
    "conteudo": "Dados histÃ³ricos e em tempo real de ADS-B e Mode S coletados por rede de receptores, com vetores de estado de aeronaves.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "O servidor devolveu HTTP 403 Ã  consulta automÃ¡tica.",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "DescriÃ§Ã£o por conhecimento prÃ©vio. Confirme as condiÃ§Ãµes de uso para pesquisa acadÃªmica e para uso comercial.",
    "confianca": "NÃ£o verificado",
    "fonte": "https://opensky-network.org/data",
    "problemas": [
      "Aeronaves, voo e trÃ¡fego aÃ©reo"
    ],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [
      "Engenharia de sistemas e seguranÃ§a (STPA)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 28,
    "nome": "ANAC: dados abertos (voos, aeronaves, seguranÃ§a operacional, drones)",
    "url": "https://www.gov.br/anac/pt-br/acesso-a-informacao/dados-abertos",
    "conteudo": "Mercado de transporte aÃ©reo, histÃ³rico de voos, passageiros, aeronaves (RAB), aeroportos, pessoal da aviaÃ§Ã£o civil, seguranÃ§a operacional e painel de drones cadastrados. HÃ¡ tambÃ©m a ferramenta ANAC DataSearch.",
    "gratuito": "Sim",
    "acesso": "PÃ¡ginas temÃ¡ticas e portal de dados abertos.",
    "licenca": "O site declara CC BY-ND 3.0 (AtribuiÃ§Ã£o-SemDerivaÃ§Ãµes) para seu conteÃºdo. NÃ£o confirma que valha para cada conjunto.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Formatos nÃ£o listados na pÃ¡gina. SemDerivaÃ§Ãµes pode restringir redistribuiÃ§Ã£o de versÃµes modificadas; confira por conjunto.",
    "confianca": "Parcial",
    "fonte": "https://www.gov.br/anac/pt-br/assuntos/dados-e-estatisticas",
    "problemas": [
      "Aeronaves, voo e trÃ¡fego aÃ©reo",
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos",
      "Transporte e logÃ­stica"
    ],
    "tecnicas": [
      "MÃ©todos de gestÃ£o e apoio Ã  decisÃ£o"
    ],
    "temas": [
      "Engenharia de sistemas e seguranÃ§a (STPA)",
      "VANTs e sistemas aÃ©reos autÃ´nomos",
      "GestÃ£o tecnolÃ³gica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 29,
    "nome": "BTS TranStats (EUA): desempenho de voos e estatÃ­sticas de transporte",
    "url": "https://www.transtats.bts.gov/",
    "conteudo": "Atividade de companhias aÃ©reas (passageiros, partidas, carga, fator de carga), atrasos de voos, tarifas mÃ©dias, dados de aviaÃ§Ã£o, rodoviÃ¡rio, ferroviÃ¡rio e marÃ­timo.",
    "gratuito": "Sim (a pÃ¡gina nÃ£o menciona custo)",
    "acesso": "Buscador de dados e catÃ¡logo aberto em data.bts.gov.",
    "licenca": "A pÃ¡gina nÃ£o declara termos de reutilizaÃ§Ã£o (site .gov do Departamento de Transportes dos EUA; confira 'Web Policies and Notices').",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Dados do governo federal dos EUA costumam ser de domÃ­nio pÃºblico, mas isso nÃ£o foi lido na pÃ¡gina.",
    "confianca": "Parcial",
    "fonte": "https://www.transtats.bts.gov/",
    "problemas": [
      "Aeronaves, voo e trÃ¡fego aÃ©reo",
      "Transporte e logÃ­stica"
    ],
    "tecnicas": [
      "OtimizaÃ§Ã£o e pesquisa operacional"
    ],
    "temas": [
      "GestÃ£o tecnolÃ³gica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 30,
    "nome": "UIUC Airfoil Coordinates Database",
    "url": "https://m-selig.ae.illinois.edu/ads/coord_database.html",
    "conteudo": "Mais de 1.600 aerofÃ³lios, de baixo nÃºmero de Reynolds (VANTs, aeromodelos) a transportes a jato e turbinas eÃ³licas, em coordenadas x,y. O site tambÃ©m lista dados de hÃ©lices.",
    "gratuito": "Sim (a pÃ¡gina nÃ£o menciona custo)",
    "acesso": "NavegaÃ§Ã£o e download no site do grupo.",
    "licenca": "Sem termos declarados (aviso 'Â© 1994â2026 UIUC Applied Aerodynamics Group').",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A pÃ¡gina nÃ£o descreve os dados de testes de tÃºnel de vento de baixa velocidade.",
    "confianca": "Parcial",
    "fonte": "https://m-selig.ae.illinois.edu/ads.html",
    "problemas": [
      "Aeronaves, voo e trÃ¡fego aÃ©reo",
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos"
    ],
    "tecnicas": [
      "Modelagem e simulaÃ§Ã£o numÃ©rica (CFD, elementos finitos)",
      "ExperimentaÃ§Ã£o, ensaios e instrumentaÃ§Ã£o"
    ],
    "temas": [
      "VANTs e sistemas aÃ©reos autÃ´nomos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 31,
    "nome": "NASA Turbulence Modeling Resource (TMR)",
    "url": "https://tmbwg.github.io/turbmodels/",
    "conteudo": "Modelos de turbulÃªncia e transiÃ§Ã£o, casos de verificaÃ§Ã£o e validaÃ§Ã£o, dados experimentais e dados DNS/LES de referÃªncia para desenvolvedores de CFD.",
    "gratuito": "Sim",
    "acesso": "Site aberto. EndereÃ§o antigo (turbmodels.larc.nasa.gov) redireciona para o novo.",
    "licenca": "Sem termos declarados na pÃ¡gina.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A pÃ¡gina consultada nÃ£o lista casos hipersÃ´nicos nem supersÃ´nicos. Confira o catÃ¡logo de casos.",
    "confianca": "Parcial",
    "fonte": "https://www.nasa.gov/nasa-turbulence-modeling-resource/",
    "problemas": [
      "PropulsÃ£o, foguetes e hipersÃ´nica",
      "Aeronaves, voo e trÃ¡fego aÃ©reo"
    ],
    "tecnicas": [
      "Modelagem e simulaÃ§Ã£o numÃ©rica (CFD, elementos finitos)"
    ],
    "temas": [
      "HipersÃ´nica, escoamento e CFD"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 32,
    "nome": "Johns Hopkins Turbulence Databases (JHTDB)",
    "url": "https://turbulence.idies.jhu.edu/home",
    "conteudo": "SimulaÃ§Ãµes numÃ©ricas diretas (DNS) e LES: turbulÃªncia isotrÃ³pica (100 TB), MHD (50 TB), escoamento em canal (130 TB), camada limite em transiÃ§Ã£o (105 TB), camada limite estÃ¡vel (40 TB), estratificada, parques eÃ³licos e snapshots atÃ© 32.768Â³ (cerca de meio petabyte).",
    "gratuito": "NÃ£o confirmado",
    "acesso": "ServiÃ§os web (REST, antigo SOAP), interfaces Python, Matlab, Fortran e C, recortes em HDF5 e ferramenta de consulta no navegador. Pode ser usado no SciServer.",
    "licenca": "NÃ£o declarada na pÃ¡gina; seÃ§Ã£o 'Legal' nÃ£o lida.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Token de autenticaÃ§Ã£o e custo nÃ£o aparecem na pÃ¡gina consultada.",
    "confianca": "Parcial",
    "fonte": "https://turbulence.idies.jhu.edu/home",
    "problemas": [
      "PropulsÃ£o, foguetes e hipersÃ´nica",
      "Aeronaves, voo e trÃ¡fego aÃ©reo"
    ],
    "tecnicas": [
      "Modelagem e simulaÃ§Ã£o numÃ©rica (CFD, elementos finitos)",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "HipersÃ´nica, escoamento e CFD"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 33,
    "nome": "NIST Chemistry WebBook (SRD 69)",
    "url": "https://webbook.nist.gov/chemistry/",
    "conteudo": "Dados termoquÃ­micos, termofÃ­sicos e de energÃ©tica de Ã­ons, alÃ©m de espectros UV/Vis, infravermelho (inclusive THz) e frequÃªncias vibracionais.",
    "gratuito": "Sim, hoje",
    "acesso": "Acesso web sem cadastro. O site diz que o NIST se reserva o direito de cobrar no futuro.",
    "licenca": "Direitos reservados (Â© Secretary of Commerce, EUA). Regido pelo Standard Reference Data Act. CitaÃ§Ã£o via DOI 10.18434/T4D303.",
    "classe": "Termos prÃ³prios ou acesso controlado",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Ã gratuito de fato, mas nÃ£o Ã© licenÃ§a aberta. Ãtil para propriedades termodinÃ¢micas de propelentes e produtos de combustÃ£o.",
    "confianca": "Confirmado",
    "fonte": "https://webbook.nist.gov/chemistry/",
    "problemas": [
      "PropulsÃ£o, foguetes e hipersÃ´nica",
      "Materiais e estruturas aeroespaciais"
    ],
    "tecnicas": [
      "SÃ­ntese e caracterizaÃ§Ã£o de materiais",
      "Modelagem e simulaÃ§Ã£o numÃ©rica (CFD, elementos finitos)"
    ],
    "temas": [
      "PropulsÃ£o a propelente sÃ³lido",
      "Materiais avanÃ§ados e polÃ­meros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 34,
    "nome": "ThrustCurve.org: curvas de empuxo de motores-foguete",
    "url": "https://www.thrustcurve.org/",
    "conteudo": "Banco de motores-foguete de modelismo e amadores: especificaÃ§Ãµes, curvas de empuxo, arquivos para simuladores. API REST gratuita (JSON ou XML).",
    "gratuito": "Sim (a pÃ¡gina nÃ£o menciona custo)",
    "acesso": "API aberta; salvar foguetes exige e-mail e senha.",
    "licenca": "Termos de uso e licenÃ§a dos dados nÃ£o declarados na pÃ¡gina.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Motores de modelismo nÃ£o representam propelentes sÃ³lidos de veÃ­culos lanÃ§adores. Ãtil para validar modelos de balÃ­stica interna em escala pequena.",
    "confianca": "Parcial",
    "fonte": "https://www.thrustcurve.org/info/api.html",
    "problemas": [
      "PropulsÃ£o, foguetes e hipersÃ´nica"
    ],
    "tecnicas": [
      "ExperimentaÃ§Ã£o, ensaios e instrumentaÃ§Ã£o"
    ],
    "temas": [
      "PropulsÃ£o a propelente sÃ³lido"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 35,
    "nome": "ESA Anomalies Dataset (ESA-ADB)",
    "url": "https://doi.org/10.5281/zenodo.12528696",
    "conteudo": "Telemetria real de trÃªs missÃµes da ESA, com anomalias anotadas por engenheiros de operaÃ§Ãµes e especialistas em aprendizado de mÃ¡quina. Acompanha pipeline de avaliaÃ§Ã£o e resultados de referÃªncia (ESA-ADB).",
    "gratuito": "Sim",
    "acesso": "Aberto no Zenodo, em trÃªs arquivos (ESA-Mission1/2/3.zip).",
    "licenca": "CC BY 3.0 IGO (dados, no registro Zenodo). CÃ³digo do ESA-ADB sob MIT.",
    "classe": "Aberta",
    "comercial": "Sim, com atribuiÃ§Ã£o",
    "tamanho": "11,6 GB (3,8 + 4,1 + 3,7 GB)",
    "citacao": "Kotowski et al., European Space Agency Dataset and Benchmark for Real-World Anomaly Detection in Spacecraft Time Series, DMLR, 2026.",
    "obs": "O README do GitHub nÃ£o declara a licenÃ§a dos dados; a do Zenodo foi lida no registro. HÃ¡ versÃ£o mais nova no Zenodo.",
    "confianca": "Confirmado",
    "fonte": "https://zenodo.org/records/12528696",
    "problemas": [
      "SatÃ©lites e missÃµes espaciais"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Confiabilidade, risco e seguranÃ§a de sistemas"
    ],
    "temas": [
      "Engenharia de sistemas e seguranÃ§a (STPA)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 36,
    "nome": "NASA SMAP e MSL: anomalias de telemetria",
    "url": "https://github.com/khundman/telemanom",
    "conteudo": "Telemetria e rÃ³tulos de anomalia do satÃ©lite SMAP e do rover Curiosity (MSL): 105 sequÃªncias de anomalia (69 SMAP, 36 MSL), 82 canais, 496.444 valores avaliados. Dados anonimizados no tempo e escalonados em (-1, 1).",
    "gratuito": "Sim, com cadastro",
    "acesso": "Download via Kaggle (exige chave de API).",
    "licenca": "CÃ³digo sob Apache 2.0. A licenÃ§a dos dados nÃ£o Ã© declarada.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Hundman et al., Detecting Spacecraft Anomalies Using LSTMs and Nonparametric Dynamic Thresholding, arXiv:1802.04431, 2018.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://github.com/khundman/telemanom",
    "problemas": [
      "SatÃ©lites e missÃµes espaciais"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Confiabilidade, risco e seguranÃ§a de sistemas"
    ],
    "temas": [
      "Engenharia de sistemas e seguranÃ§a (STPA)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 37,
    "nome": "Space-Track.org (catÃ¡logo e elementos orbitais do governo dos EUA)",
    "url": "https://www.space-track.org/",
    "conteudo": "CatÃ¡logo de objetos espaciais (SATCAT), elementos orbitais GP em TLE/OMM/JSON/CSV, dados de decaimento e reentrada e mensagens de dados de conjunÃ§Ã£o (CDM).",
    "gratuito": "Sim, com cadastro",
    "acesso": "Conta gratuita e pessoal. Limites de API: menos de 30 requisiÃ§Ãµes por minuto e 300 por hora; cada tipo de dado tem frequÃªncia mÃ¡xima de coleta.",
    "licenca": "Contrato de usuÃ¡rio prÃ³prio. RedistribuiÃ§Ã£o de dados bÃ¡sicos (TLE/OMM, SATCAT, decaimento) tem aprovaÃ§Ã£o geral, desde que citada a fonte.",
    "classe": "Termos prÃ³prios ou acesso controlado",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "TLEs pÃºblicos nÃ£o devem ser usados para avaliaÃ§Ã£o de conjunÃ§Ã£o. Dados como RCS numÃ©rico exigem acordo ou pedido ao USSPACECOM.",
    "confianca": "Confirmado",
    "fonte": "https://www.space-track.org/documentation",
    "problemas": [
      "SatÃ©lites e missÃµes espaciais"
    ],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 38,
    "nome": "CelesTrak (elementos orbitais, SATCAT, SOCRATES)",
    "url": "https://celestrak.org/",
    "conteudo": "Elementos GP/TLE atuais, catÃ¡logo SATCAT, relatÃ³rios de conjunÃ§Ã£o SOCRATES, dados GPS (NANUs, almanaques), parÃ¢metros de orientaÃ§Ã£o da Terra e clima espacial.",
    "gratuito": "Sim",
    "acesso": "Acesso aberto, sujeito Ã  polÃ­tica de uso do site (nÃ£o lida). OrganizaÃ§Ã£o sem fins lucrativos que pede doaÃ§Ãµes.",
    "licenca": "PolÃ­tica de uso prÃ³pria, nÃ£o lida.",
    "classe": "Termos prÃ³prios ou acesso controlado",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Desde 2026-07-11 acabaram os nÃºmeros de catÃ¡logo de 5 dÃ­gitos: objetos novos tÃªm 6 dÃ­gitos e nÃ£o existem em TLE. Use os formatos OMM, JSON ou CSV.",
    "confianca": "Parcial",
    "fonte": "https://celestrak.org/",
    "problemas": [
      "SatÃ©lites e missÃµes espaciais",
      "NavegaÃ§Ã£o, GNSS e ionosfera"
    ],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [
      "GNSS e ionosfera"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 39,
    "nome": "RadioML (DeepSig): 2016.04C, 2016.10A e 2018.01A",
    "url": "https://www.deepsig.ai/datasets/",
    "conteudo": "Sinais de rÃ¡dio sintÃ©ticos com efeitos de canal para classificaÃ§Ã£o automÃ¡tica de modulaÃ§Ã£o. A versÃ£o 2018.01A tem 24 modulaÃ§Ãµes, 2 milhÃµes de exemplos de 1024 amostras I/Q (HDF5). As de 2016 tÃªm 11 modulaÃ§Ãµes.",
    "gratuito": "Sim",
    "acesso": "Download direto (opendata.deepsig.io).",
    "licenca": "Creative Commons CC BY-NC-SA 4.0 (todos os conjuntos). Para outra licenÃ§a, contatar a DeepSig.",
    "classe": "SÃ³ pesquisa ou nÃ£o comercial",
    "comercial": "NÃ£o, sob esta licenÃ§a",
    "tamanho": "",
    "citacao": "",
    "obs": "A prÃ³pria DeepSig diz que os dados sÃ£o de 2016/2017, tÃªm erratas conhecidas, nÃ£o os mantÃ©m e nÃ£o os recomenda para produtos. Prefira dados reais ou gerar os seus.",
    "confianca": "Confirmado",
    "fonte": "https://www.deepsig.ai/datasets/",
    "problemas": [
      "ComunicaÃ§Ãµes sem fio e transmissÃ£o",
      "Defesa e guerra eletrÃ´nica"
    ],
    "tecnicas": [
      "ComunicaÃ§Ãµes digitais (modulaÃ§Ã£o, codificaÃ§Ã£o, canal)",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes e protocolos de comunicaÃ§Ã£o",
      "Aprendizado profundo para imagens e detecÃ§Ã£o"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 40,
    "nome": "CRAWDAD (IEEE DataPort): traÃ§os de redes sem fio",
    "url": "https://ieee-dataport.org/collections/crawdad",
    "conteudo": "Arquivo de dados de redes sem fio reais e usuÃ¡rios mÃ³veis, fundado em 2004 por Kotz e Henderson. Os conjuntos agora ficam na coleÃ§Ã£o CRAWDAD do IEEE DataPort.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Conta gratuita no IEEE DataPort. A pÃ¡gina diz que todos os conjuntos serÃ£o Open Access apÃ³s aprovaÃ§Ã£o.",
    "licenca": "NÃ£o declarada na pÃ¡gina; pode variar por conjunto.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A pÃ¡gina nÃ£o informa o nÃºmero de conjuntos nem um modelo de citaÃ§Ã£o.",
    "confianca": "Parcial",
    "fonte": "https://crawdad.org/",
    "problemas": [
      "ComunicaÃ§Ãµes sem fio e transmissÃ£o",
      "Redes de computadores e internet"
    ],
    "tecnicas": [
      "Redes, protocolos e seguranÃ§a da informaÃ§Ã£o"
    ],
    "temas": [
      "Redes e protocolos de comunicaÃ§Ã£o"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 41,
    "nome": "DeepMIMO",
    "url": "https://www.deepmimo.net/",
    "conteudo": "Datasets de canais MIMO gerados por traÃ§ado de raios em cenÃ¡rios de ambientes urbanos e internos (descriÃ§Ã£o por conhecimento prÃ©vio).",
    "gratuito": "NÃ£o confirmado",
    "acesso": "A pÃ¡gina consultada sÃ³ mostrou o tÃ­tulo.",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Confirme cenÃ¡rios, licenÃ§a e citaÃ§Ã£o no site.",
    "confianca": "NÃ£o verificado",
    "fonte": "https://www.deepmimo.net/",
    "problemas": [
      "ComunicaÃ§Ãµes sem fio e transmissÃ£o"
    ],
    "tecnicas": [
      "ComunicaÃ§Ãµes digitais (modulaÃ§Ã£o, codificaÃ§Ã£o, canal)",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes e protocolos de comunicaÃ§Ã£o"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 42,
    "nome": "Anatel: dados abertos (telefonia, banda larga, ERBs, espectro)",
    "url": "https://dados.gov.br/dados/organizacoes/visualizar/agencia-nacional-de-telecomunicacoes",
    "conteudo": "Conjuntos publicados pela Anatel no Portal Brasileiro de Dados Abertos (descriÃ§Ã£o por conhecimento prÃ©vio).",
    "gratuito": "NÃ£o confirmado",
    "acesso": "A pÃ¡gina consultada sÃ³ mostrou o tÃ­tulo 'Portal de Dados Abertos'.",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Confira no portal quais conjuntos existem, formatos e a licenÃ§a de cada um.",
    "confianca": "NÃ£o verificado",
    "fonte": "https://dados.gov.br/",
    "problemas": [
      "ComunicaÃ§Ãµes sem fio e transmissÃ£o"
    ],
    "tecnicas": [],
    "temas": [
      "Redes e protocolos de comunicaÃ§Ã£o",
      "GestÃ£o tecnolÃ³gica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 43,
    "nome": "CAIDA: topologia, DNS e telescÃ³pio de rede",
    "url": "https://www.caida.org/catalog/datasets/overview/",
    "conteudo": "Topologia (traceroutes do Ark IPv4/IPv6, ITDK, AS Rank, AS Relationships, AS2Org, PeeringDB Archive, mapeamentos de prefixo), geolocalizaÃ§Ã£o, infraestrutura, DNS e telescÃ³pio de rede da UCSD (fluxos agregados, ataques RSDoS).",
    "gratuito": "Sim, parcialmente sob solicitaÃ§Ã£o",
    "acesso": "Parte pÃºblica (AS Rank, AS Relationships, AS2Org e outros). Parte restrita por formulÃ¡rio de pedido (ITDK, Ark DNS, todos os conjuntos de telescÃ³pio; dados em tempo real ficam 14 dias, histÃ³rico desde 2008 sob pedido).",
    "licenca": "Acordo de Uso AceitÃ¡vel (AUA) do CAIDA. Quem publica deve avisar o CAIDA.",
    "classe": "Termos prÃ³prios ou acesso controlado",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Textos do AUA e das FAQs de uso nÃ£o foram lidos.",
    "confianca": "Confirmado",
    "fonte": "https://www.caida.org/catalog/datasets/overview/",
    "problemas": [
      "Redes de computadores e internet",
      "SeguranÃ§a cibernÃ©tica"
    ],
    "tecnicas": [
      "Redes, protocolos e seguranÃ§a da informaÃ§Ã£o"
    ],
    "temas": [
      "Redes e protocolos de comunicaÃ§Ã£o"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 44,
    "nome": "MAWI Working Group Traffic Archive (WIDE)",
    "url": "http://mawi.wide.ad.jp/mawi/",
    "conteudo": "TraÃ§os de pacotes (tcpdump) do backbone WIDE, com IPs embaralhados. Principal ponto de captura (samplepoint-F) de 2006 a 2026; pontos mais antigos de 1999 a 2009 e 2018â2020. O MAWILab (rÃ³tulos de anomalia) foi encerrado em dez/2024.",
    "gratuito": "Sim (a pÃ¡gina nÃ£o menciona custo)",
    "acesso": "Download pÃºblico.",
    "licenca": "Uso permitido apenas para pesquisa. ProÃ­be violar a privacidade dos usuÃ¡rios.",
    "classe": "SÃ³ pesquisa ou nÃ£o comercial",
    "comercial": "NÃ£o",
    "tamanho": "",
    "citacao": "",
    "obs": "Faltam dados de 4/nov a 15/dez de 2022. TraÃ§os de 28/mai a 3/set de 2015 tÃªm pacotes duplicados.",
    "confianca": "Confirmado",
    "fonte": "http://mawi.wide.ad.jp/mawi/",
    "problemas": [
      "Redes de computadores e internet",
      "SeguranÃ§a cibernÃ©tica"
    ],
    "tecnicas": [
      "Redes, protocolos e seguranÃ§a da informaÃ§Ã£o"
    ],
    "temas": [
      "Redes e protocolos de comunicaÃ§Ã£o"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 45,
    "nome": "M-Lab (Measurement Lab)",
    "url": "https://www.measurementlab.net/data/",
    "conteudo": "SaÃ­das brutas de testes de rede: NDT (desempenho TCP), traceroute, Reverse Traceroute, Neubot DASH, WeHe, MSAK e IPRS, alÃ©m de cabeÃ§alhos de pacotes e TCP INFO.",
    "gratuito": "Sim",
    "acesso": "Arquivos no Google Cloud Storage e BigQuery para parte dos testes. Atraso mÃ­nimo de 24 h.",
    "licenca": "CC0 (domÃ­nio pÃºblico) para os dados. O conteÃºdo do site Ã© CC BY-NC-SA 4.0.",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "",
    "citacao": "The M-Lab <nome do teste> Data Set, <perÃ­odo usado>. <URL do teste>.",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://www.measurementlab.net/data/",
    "problemas": [
      "Redes de computadores e internet"
    ],
    "tecnicas": [
      "Redes, protocolos e seguranÃ§a da informaÃ§Ã£o"
    ],
    "temas": [
      "Redes e protocolos de comunicaÃ§Ã£o"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 46,
    "nome": "CIC-IDS2017 (Univ. de New Brunswick)",
    "url": "https://www.unb.ca/cic/datasets/ids-2017.html",
    "conteudo": "TrÃ¡fego benigno e ataques de cinco dias de julho de 2017: forÃ§a bruta FTP/SSH, DoS, Heartbleed, ataques web, infiltraÃ§Ã£o, botnet, DDoS e port scan. PCAP e fluxos rotulados em CSV com mais de 80 atributos (CICFlowMeter).",
    "gratuito": "Sim",
    "acesso": "PÃ¡gina de download do CIC (cicresearch.ca).",
    "licenca": "DisponÃ­vel a pesquisadores. A pÃ¡gina nÃ£o nomeia licenÃ§a nem termos.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "Seg. 11 GB, ter. 11 GB, qua. 13 GB, qui. 7,8 GB, sex. 8,3 GB",
    "citacao": "Sharafaldin, Habibi Lashkari e Ghorbani, Toward Generating a New Intrusion Detection Dataset and Intrusion Traffic Characterization, ICISSP 2018.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://www.unb.ca/cic/datasets/ids-2017.html",
    "problemas": [
      "SeguranÃ§a cibernÃ©tica",
      "Redes de computadores e internet"
    ],
    "tecnicas": [
      "Redes, protocolos e seguranÃ§a da informaÃ§Ã£o",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes e protocolos de comunicaÃ§Ã£o",
      "Redes neurais artificiais (clÃ¡ssicas)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 47,
    "nome": "UNSW-NB15",
    "url": "https://research.unsw.edu.au/projects/unsw-nb15-dataset",
    "conteudo": "2.540.044 registros em quatro CSVs, nove categorias de ataque (Fuzzers, Analysis, Backdoors, DoS, Exploits, Generic, Reconnaissance, Shellcode, Worms), 49 atributos, divisÃ£o treino/teste (175.341 e 82.332) e cerca de 100 GB de capturas brutas (pcap, BRO, Argus).",
    "gratuito": "Sim",
    "acesso": "Pasta SharePoint da UNSW linkada na pÃ¡gina.",
    "licenca": "Uso livre para pesquisa acadÃªmica, em carÃ¡ter perpÃ©tuo. Uso comercial deve ser acordado com os autores.",
    "classe": "SÃ³ pesquisa ou nÃ£o comercial",
    "comercial": "Sob acordo com os autores",
    "tamanho": "",
    "citacao": "Moustafa e Slay (2015, 2016), Moustafa et al. (2017) e Sarhan et al. (2020), como listado na pÃ¡gina.",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://research.unsw.edu.au/projects/unsw-nb15-dataset",
    "problemas": [
      "SeguranÃ§a cibernÃ©tica",
      "Redes de computadores e internet"
    ],
    "tecnicas": [
      "Redes, protocolos e seguranÃ§a da informaÃ§Ã£o",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes e protocolos de comunicaÃ§Ã£o",
      "Redes neurais artificiais (clÃ¡ssicas)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 48,
    "nome": "TON_IoT (UNSW Canberra)",
    "url": "https://research.unsw.edu.au/projects/toniot-datasets",
    "conteudo": "Telemetria de IoT/IIoT (mais de 10 sensores), desempenho de Windows 7/10 e Ubuntu 14/18, trÃ¡fego de rede (PCAP, Zeek, TLS) e ataques (DoS, DDoS, ransomware) rotulados.",
    "gratuito": "Sim",
    "acesso": "SharePoint linkado na pÃ¡gina.",
    "licenca": "Uso livre para pesquisa acadÃªmica, em carÃ¡ter perpÃ©tuo. Uso comercial sÃ³ apÃ³s consultar o autor.",
    "classe": "SÃ³ pesquisa ou nÃ£o comercial",
    "comercial": "Sob consulta ao autor",
    "tamanho": "",
    "citacao": "Ã preciso citar os oito artigos listados na pÃ¡gina.",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://research.unsw.edu.au/projects/toniot-datasets",
    "problemas": [
      "SeguranÃ§a cibernÃ©tica",
      "Redes de computadores e internet"
    ],
    "tecnicas": [
      "Redes, protocolos e seguranÃ§a da informaÃ§Ã£o",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes e protocolos de comunicaÃ§Ã£o"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 49,
    "nome": "CTU-13 (botnets)",
    "url": "https://www.stratosphereips.org/datasets-ctu13",
    "conteudo": "13 capturas rotuladas de trÃ¡fego de botnet, normal e de fundo (CTU, 2011). Cada cenÃ¡rio tem pcap sÃ³ do botnet, NetFlow bidirecional rotulado e o executÃ¡vel do malware.",
    "gratuito": "Sim",
    "acesso": "Download pÃºblico no site (1,9 GB, ou por cenÃ¡rio). CÃ³pia de seguranÃ§a no Mega.",
    "licenca": "NÃ£o declarada.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "1,9 GB (.tar.bz2)",
    "citacao": "Garcia, Grill, Stiborek e Zunino, An empirical comparison of botnet detection methods, Computers and Security, 45, 2014.",
    "obs": "Use os NetFlows bidirecionais; a pÃ¡gina diz que os unidirecionais antigos nÃ£o devem ser usados. O pcap completo nÃ£o Ã© publicado, por privacidade.",
    "confianca": "Parcial",
    "fonte": "https://www.stratosphereips.org/datasets-ctu13",
    "problemas": [
      "SeguranÃ§a cibernÃ©tica"
    ],
    "tecnicas": [
      "Redes, protocolos e seguranÃ§a da informaÃ§Ã£o"
    ],
    "temas": [
      "Redes e protocolos de comunicaÃ§Ã£o"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 50,
    "nome": "Defects4J",
    "url": "https://github.com/rjust/defects4j",
    "conteudo": "854 bugs reais e reproduzÃ­veis (mais 10 obsoletos) de 17 projetos Java de cÃ³digo aberto, cada um com o teste que falha antes da correÃ§Ã£o e passa depois, mais infraestrutura para experimentos controlados.",
    "gratuito": "Sim",
    "acesso": "git clone e ./init.sh. Requer Java 11, Git, Subversion e Perl.",
    "licenca": "MIT",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "",
    "citacao": "Just, Jalali e Ernst, Defects4J, ISSTA 2014.",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://github.com/rjust/defects4j",
    "problemas": [
      "Software e sistemas de informaÃ§Ã£o"
    ],
    "tecnicas": [
      "Engenharia de software e de sistemas"
    ],
    "temas": [
      "Engenharia de software"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 51,
    "nome": "OULAD: Open University Learning Analytics Dataset",
    "url": "https://research.stem.open.ac.uk/ouanalyse/",
    "conteudo": "Dados anonimizados de estudantes, mÃ³dulos, interaÃ§Ãµes no ambiente virtual e avaliaÃ§Ãµes da Open University (descriÃ§Ã£o por conhecimento prÃ©vio; a pÃ¡gina consultada sÃ³ traz a citaÃ§Ã£o).",
    "gratuito": "NÃ£o confirmado",
    "acesso": "A pÃ¡gina redireciona para uma seÃ§Ã£o 'Open dataset' que nÃ£o foi lida.",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Kuzilek, Hlosta e Zdrahal, Open University Learning Analytics dataset, Scientific Data 4:170171, 2017.",
    "obs": "Confirme licenÃ§a e conteÃºdo antes de usar.",
    "confianca": "NÃ£o verificado",
    "fonte": "https://research.stem.open.ac.uk/ouanalyse/",
    "problemas": [
      "Software e sistemas de informaÃ§Ã£o"
    ],
    "tecnicas": [
      "Conhecimento, mineraÃ§Ã£o de dados e lÃ³gica nebulosa"
    ],
    "temas": [
      "MineraÃ§Ã£o de dados e sistemas de conhecimento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 52,
    "nome": "DroneRF (Universidade do Catar)",
    "url": "https://data.mendeley.com/datasets/f4c2b4n755/1",
    "conteudo": "GravaÃ§Ãµes de radiofrequÃªncia de trÃªs drones em vÃ¡rios modos (desligado, ligado e conectado, pairando, voando, gravando vÃ­deo): 227 segmentos, mais gravaÃ§Ãµes de fundo sem drones. Para detecÃ§Ã£o, identificaÃ§Ã£o e rastreamento de drones.",
    "gratuito": "Sim",
    "acesso": "Download no Mendeley Data (DOI 10.17632/f4c2b4n755.1).",
    "licenca": "CC BY 4.0",
    "classe": "Aberta",
    "comercial": "Sim, com atribuiÃ§Ã£o",
    "tamanho": "",
    "citacao": "Al-Sa'd et al., DroneRF dataset, Mendeley Data, v1, 2019.",
    "obs": "Cada segmento vem em duas partes que precisam ser carregadas juntas.",
    "confianca": "Confirmado",
    "fonte": "https://data.mendeley.com/datasets/f4c2b4n755/1",
    "problemas": [
      "Defesa e guerra eletrÃ´nica",
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos",
      "ComunicaÃ§Ãµes sem fio e transmissÃ£o"
    ],
    "tecnicas": [
      "Processamento de sinais e imagens",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "VANTs e sistemas aÃ©reos autÃ´nomos",
      "Aprendizado profundo para imagens e detecÃ§Ã£o"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 53,
    "nome": "SIPRI: bases de gastos militares, transferÃªncia de armas e indÃºstria",
    "url": "https://www.sipri.org/databases",
    "conteudo": "Quatro bases: Arms Industry (100 maiores produtoras), Arms Transfers (desde 1950), Military Expenditure (desde 1949, moeda local, dÃ³lar constante e % do PIB) e Multilateral Peace Operations (desde 2000).",
    "gratuito": "NÃ£o confirmado",
    "acesso": "Consulta no site. Termos em /databases/terms (nÃ£o lidos).",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Ãtil para anÃ¡lise de gestÃ£o e polÃ­tica de defesa. Verifique os termos antes de redistribuir.",
    "confianca": "Parcial",
    "fonte": "https://www.sipri.org/databases",
    "problemas": [
      "Defesa e guerra eletrÃ´nica",
      "GestÃ£o, inovaÃ§Ã£o e polÃ­ticas"
    ],
    "tecnicas": [
      "MÃ©todos de gestÃ£o e apoio Ã  decisÃ£o"
    ],
    "temas": [
      "GestÃ£o tecnolÃ³gica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 54,
    "nome": "OpenAlex",
    "url": "https://openalex.org/",
    "conteudo": "Ãndice aberto da produÃ§Ã£o cientÃ­fica mundial: obras, autores, instituiÃ§Ãµes, tÃ³picos e citaÃ§Ãµes. Ãtil para mapear linhas de pesquisa e redes de coautoria do ITA.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "API e snapshot. A pÃ¡gina de ajuda consultada Ã© sÃ³ um Ã­ndice; preÃ§o, crÃ©ditos de API e chave nÃ£o estavam nela.",
    "licenca": "NÃ£o confirmada nesta sessÃ£o. (Conhecimento prÃ©vio: dados em CC0. Confirmar.)",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Complementa bem o nosso acervo do BDITA com publicaÃ§Ãµes em periÃ³dicos e conferÃªncias.",
    "confianca": "NÃ£o verificado",
    "fonte": "https://help.openalex.org/",
    "problemas": [
      "GestÃ£o, inovaÃ§Ã£o e polÃ­ticas"
    ],
    "tecnicas": [
      "MÃ©todos de gestÃ£o e apoio Ã  decisÃ£o",
      "Conhecimento, mineraÃ§Ã£o de dados e lÃ³gica nebulosa"
    ],
    "temas": [
      "GestÃ£o tecnolÃ³gica e defesa",
      "MineraÃ§Ã£o de dados e sistemas de conhecimento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 55,
    "nome": "CAPES Dados Abertos (teses, dissertaÃ§Ãµes e pÃ³s-graduaÃ§Ã£o)",
    "url": "https://dadosabertos.capes.gov.br/",
    "conteudo": "Dados abertos da CAPES, entre eles o CatÃ¡logo de Teses e DissertaÃ§Ãµes e informaÃ§Ãµes da pÃ³s-graduaÃ§Ã£o (descriÃ§Ã£o por conhecimento prÃ©vio).",
    "gratuito": "NÃ£o confirmado",
    "acesso": "O portal nÃ£o respondeu nesta sessÃ£o (tempo esgotado e HTTP 403).",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Diretamente Ãºtil ao nosso projeto: permite cruzar os trabalhos do ITA com o conjunto nacional de teses.",
    "confianca": "NÃ£o verificado",
    "fonte": "https://dadosabertos.capes.gov.br/",
    "problemas": [
      "GestÃ£o, inovaÃ§Ã£o e polÃ­ticas"
    ],
    "tecnicas": [
      "MÃ©todos de gestÃ£o e apoio Ã  decisÃ£o"
    ],
    "temas": [
      "GestÃ£o tecnolÃ³gica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 56,
    "nome": "BDTD (IBICT): Biblioteca Digital Brasileira de Teses e DissertaÃ§Ãµes",
    "url": "https://bdtd.ibict.br/",
    "conteudo": "Agregador nacional de teses e dissertaÃ§Ãµes de instituiÃ§Ãµes brasileiras (descriÃ§Ã£o por conhecimento prÃ©vio).",
    "gratuito": "NÃ£o confirmado",
    "acesso": "A pÃ¡gina consultada sÃ³ mostrou o tÃ­tulo 'BDTD'.",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Confirme se hÃ¡ coleta por OAI-PMH e quais sÃ£o os termos.",
    "confianca": "NÃ£o verificado",
    "fonte": "https://bdtd.ibict.br/",
    "problemas": [
      "GestÃ£o, inovaÃ§Ã£o e polÃ­ticas"
    ],
    "tecnicas": [
      "MÃ©todos de gestÃ£o e apoio Ã  decisÃ£o"
    ],
    "temas": [
      "GestÃ£o tecnolÃ³gica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 57,
    "nome": "INPI: dados abertos (patentes, marcas, desenhos industriais)",
    "url": "https://dadosabertos.inpi.gov.br/",
    "conteudo": "Dados abertos do Instituto Nacional da Propriedade Industrial, publicados em portal prÃ³prio e no Portal Brasileiro de Dados Abertos. HÃ¡ conjuntos programados para abertura.",
    "gratuito": "Sim (a pÃ¡gina nÃ£o menciona custo)",
    "acesso": "Portal dadosabertos.inpi.gov.br. A pÃ¡gina consultada nÃ£o lista conjuntos nem formatos.",
    "licenca": "O site gov.br declara CC BY-ND 3.0 para seu conteÃºdo. NÃ£o confirma que valha para cada conjunto.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Ãtil para anÃ¡lise de inovaÃ§Ã£o (patentes depositadas por instituiÃ§Ãµes de defesa e aeroespacial).",
    "confianca": "Parcial",
    "fonte": "https://www.gov.br/inpi/pt-br/acesso-a-informacao/dados-abertos",
    "problemas": [
      "GestÃ£o, inovaÃ§Ã£o e polÃ­ticas"
    ],
    "tecnicas": [
      "MÃ©todos de gestÃ£o e apoio Ã  decisÃ£o"
    ],
    "temas": [
      "GestÃ£o tecnolÃ³gica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 58,
    "nome": "PatentsView (patentes dos EUA)",
    "url": "https://data.uspto.gov/support/transition-guide/patentsview",
    "conteudo": "Dados de patentes dos EUA (patentes, inventores, titulares, citaÃ§Ãµes). O serviÃ§o migrou para o portal de dados do USPTO.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "O endereÃ§o antigo redireciona para o guia de transiÃ§Ã£o do USPTO; o conteÃºdo consultado veio vazio.",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Confirme o novo local de download e a licenÃ§a no portal do USPTO.",
    "confianca": "NÃ£o verificado",
    "fonte": "https://data.uspto.gov/support/transition-guide/patentsview",
    "problemas": [
      "GestÃ£o, inovaÃ§Ã£o e polÃ­ticas"
    ],
    "tecnicas": [
      "MÃ©todos de gestÃ£o e apoio Ã  decisÃ£o"
    ],
    "temas": [
      "GestÃ£o tecnolÃ³gica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 59,
    "nome": "NASA PCoE: fadiga de compÃ³sitos CFRP e crescimento de trinca em alumÃ­nio",
    "url": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "conteudo": "Fadiga atÃ© a falha de painÃ©is de fibra de carbono (CFRP), com ondas de Lamb, deformaÃ§Ã£o e raios X; e crescimento de trinca em junta sobreposta de alumÃ­nio, com sinais de ondas de Lamb e medidas Ã³pticas de comprimento de trinca.",
    "gratuito": "Parcial",
    "acesso": "CompÃ³sitos CFRP: download direto. Trinca em alumÃ­nio: 'Contact NASA' (e-mail na pÃ¡gina).",
    "licenca": "Sem licenÃ§a declarada; uso por conta e risco, com agradecimento ao repositÃ³rio.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "problemas": [
      "Materiais e estruturas aeroespaciais",
      "Aeronaves, voo e trÃ¡fego aÃ©reo"
    ],
    "tecnicas": [
      "SÃ­ntese e caracterizaÃ§Ã£o de materiais",
      "Confiabilidade, risco e seguranÃ§a de sistemas"
    ],
    "temas": [
      "Materiais avanÃ§ados e polÃ­meros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 60,
    "nome": "JARVIS (NIST)",
    "url": "https://jarvis.nist.gov/",
    "conteudo": "JARVIS-DFT (mais de 80.000 materiais), JARVIS-QETB (mais de 800.000), campos de forÃ§a clÃ¡ssicos, aprendizado de mÃ¡quina (ALIGNN), bases de supercondutores e interfaces e um leaderboard com mais de 300 benchmarks. Mais de 1,5 milhÃ£o de pontos de dados no Figshare.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Login gratuito para os aplicativos web; API OPTIMADE; downloads no Figshare; cÃ³digo no GitHub (usnistgov).",
    "licenca": "NÃ£o declarada na pÃ¡gina; link 'Terms of use' nÃ£o lido.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Choudhary et al., npj Computational Materials 6, 173 (2020), doi:10.1038/s41524-020-00440-1.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://jarvis.nist.gov/",
    "problemas": [
      "Materiais e estruturas aeroespaciais"
    ],
    "tecnicas": [
      "SÃ­ntese e caracterizaÃ§Ã£o de materiais",
      "Redes neurais e aprendizado profundo",
      "Modelagem e simulaÃ§Ã£o numÃ©rica (CFD, elementos finitos)"
    ],
    "temas": [
      "Materiais avanÃ§ados e polÃ­meros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 61,
    "nome": "Materials Project",
    "url": "https://next-gen.materialsproject.org/",
    "conteudo": "Propriedades de materiais calculadas por DFT (descriÃ§Ã£o por conhecimento prÃ©vio).",
    "gratuito": "NÃ£o confirmado",
    "acesso": "O servidor devolveu HTTP 403 Ã  consulta automÃ¡tica.",
    "licenca": "NÃ£o confirmada nesta sessÃ£o. (Conhecimento prÃ©vio: CC BY 4.0 e chave de API. Confirmar.)",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "NÃ£o verificado",
    "fonte": "https://next-gen.materialsproject.org/about",
    "problemas": [
      "Materiais e estruturas aeroespaciais"
    ],
    "tecnicas": [
      "SÃ­ntese e caracterizaÃ§Ã£o de materiais"
    ],
    "temas": [
      "Materiais avanÃ§ados e polÃ­meros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 62,
    "nome": "OQMD: Open Quantum Materials Database",
    "url": "https://oqmd.org/",
    "conteudo": "Propriedades termodinÃ¢micas e estruturais calculadas por DFT (descriÃ§Ã£o por conhecimento prÃ©vio).",
    "gratuito": "NÃ£o confirmado",
    "acesso": "O servidor devolveu HTTP 502 Ã  consulta automÃ¡tica.",
    "licenca": "NÃ£o confirmada nesta sessÃ£o.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "NÃ£o verificado",
    "fonte": "https://oqmd.org/",
    "problemas": [
      "Materiais e estruturas aeroespaciais"
    ],
    "tecnicas": [
      "SÃ­ntese e caracterizaÃ§Ã£o de materiais"
    ],
    "temas": [
      "Materiais avanÃ§ados e polÃ­meros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 63,
    "nome": "RefractiveIndex.INFO",
    "url": "https://refractiveindex.info/",
    "conteudo": "Constantes Ã³pticas (n, k) de materiais em arquivos YAML, inclusive Ã­ndice de refraÃ§Ã£o nÃ£o linear (n2), com calculadoras de absorÃ§Ã£o, reflexÃ£o de Fresnel e Ã¢ngulo de Brewster.",
    "gratuito": "Sim",
    "acesso": "Download da versÃ£o em zip (rii-database-2026-05-24.zip) ou repositÃ³rio polyanskiy/refractiveindex.info-database no GitHub.",
    "licenca": "CC0 1.0 (domÃ­nio pÃºblico). Uso livre, inclusive comercial, sem necessidade de permissÃ£o.",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "",
    "citacao": "Polyanskiy, Sci. Data 11, 94 (2024), doi:10.1038/s41597-023-02898-2.",
    "obs": "Sem garantia de acurÃ¡cia ('use at your own risk').",
    "confianca": "Confirmado",
    "fonte": "https://refractiveindex.info/about",
    "problemas": [
      "Antenas, RF e comunicaÃ§Ãµes Ã³pticas",
      "Materiais e estruturas aeroespaciais"
    ],
    "tecnicas": [
      "Eletromagnetismo, RF e fotÃ´nica",
      "SÃ­ntese e caracterizaÃ§Ã£o de materiais"
    ],
    "temas": [
      "FotÃ´nica e enlaces Ã³pticos",
      "Materiais avanÃ§ados e polÃ­meros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 64,
    "nome": "NASA PCoE: baterias de Ã­on-lÃ­tio",
    "url": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "conteudo": "Ciclos de carga e descarga de Ã­on-lÃ­tio em vÃ¡rias temperaturas com impedÃ¢ncia; uso aleatÃ³rio de corrente com ciclos de referÃªncia (sete partes); teste acelerado de vida de pacotes 18650 e segunda vida; simulaÃ§Ã£o de potÃªncia de bateria de pequeno satÃ©lite; baterias do aviÃ£o Edge 540 em cÃ¢mara HIRF.",
    "gratuito": "Parcial",
    "acesso": "Baterias Li-ion e uso aleatÃ³rio: download direto. Teste acelerado e simulaÃ§Ã£o de satÃ©lite: contato com a NASA. HIRF: referÃªncia marcada como fora do ar.",
    "licenca": "Sem licenÃ§a declarada; uso por conta e risco, com agradecimento ao repositÃ³rio.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Direto para estimaÃ§Ã£o de estado de carga (SOC) e prognÃ³stico de vida Ãºtil.",
    "confianca": "Confirmado",
    "fonte": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "problemas": [
      "Energia, baterias e eletroquÃ­mica",
      "SatÃ©lites e missÃµes espaciais"
    ],
    "tecnicas": [
      "Confiabilidade, risco e seguranÃ§a de sistemas",
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 65,
    "nome": "CALCE Battery Data (Univ. de Maryland)",
    "url": "https://calce.umd.edu/battery-data",
    "conteudo": "CÃ©lulas cilÃ­ndricas (INR 18650-20R; A123), prismÃ¡ticas (CS2, CX2) e pouch (PL), quÃ­micas LCO, LFP e NMC. Testes OCV (C/20 e incremental), perfis dinÃ¢micos (DST, FUDS, US06, BJDST) de -10 a 50 Â°C, ciclagem de vÃ¡rios tipos, SOC parcial e armazenamento de 144 cÃ©lulas.",
    "gratuito": "Sim",
    "acesso": "Downloads em ZIP por cÃ©lula e teste.",
    "licenca": "Sem licenÃ§a declarada. A pÃ¡gina descreve 'open access' e pede citar os artigos CALCE de cada conjunto.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Contato: Prof. Michael Pecht. Volume total nÃ£o informado.",
    "confianca": "Parcial",
    "fonte": "https://calce.umd.edu/battery-data",
    "problemas": [
      "Energia, baterias e eletroquÃ­mica"
    ],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores",
      "ExperimentaÃ§Ã£o, ensaios e instrumentaÃ§Ã£o"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 66,
    "nome": "Battery Archive",
    "url": "https://batteryarchive.org/",
    "conteudo": "Dados de ciclagem e testes disruptivos de baterias de vÃ¡rias instituiÃ§Ãµes, com ferramentas de visualizaÃ§Ã£o, filtro por condiÃ§Ãµes de teste e modelos de degradaÃ§Ã£o. Apoio do DOE (Sandia).",
    "gratuito": "Parcial",
    "acesso": "VisualizaÃ§Ã£o no site. Os CSVs completos sÃ£o enviados mediante e-mail para info@batteryarchive.org.",
    "licenca": "NÃ£o declarada.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://batteryarchive.org/",
    "problemas": [
      "Energia, baterias e eletroquÃ­mica"
    ],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 67,
    "nome": "NMDB: Neutron Monitor Database",
    "url": "https://www.nmdb.eu/",
    "conteudo": "Medidas de monitores de nÃªutrons de estaÃ§Ãµes do mundo todo, em tempo real e histÃ³rico (raios cÃ³smicos secundÃ¡rios).",
    "gratuito": "Sim",
    "acesso": "Interface web simples.",
    "licenca": "Gratuito para uso nÃ£o comercial, dentro das restriÃ§Ãµes impostas pelos provedores. A propriedade fica com cada provedor.",
    "classe": "SÃ³ pesquisa ou nÃ£o comercial",
    "comercial": "NÃ£o",
    "tamanho": "",
    "citacao": "",
    "obs": "Exige agradecer ao NMDB (programa EU FP7, contrato 213007) e a cada monitor usado. Dados de outras origens podem nÃ£o ter sido validados pelo responsÃ¡vel da estaÃ§Ã£o. Diretamente ligado aos trabalhos do acervo sobre radiaÃ§Ã£o cÃ³smica a bordo de aeronaves.",
    "confianca": "Confirmado",
    "fonte": "https://www.nmdb.eu/",
    "problemas": [
      "RadiaÃ§Ã£o e ambiente espacial e atmosfÃ©rico",
      "Aeronaves, voo e trÃ¡fego aÃ©reo"
    ],
    "tecnicas": [
      "ExperimentaÃ§Ã£o, ensaios e instrumentaÃ§Ã£o"
    ],
    "temas": [
      "RadiaÃ§Ã£o cÃ³smica e aeronaves"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 68,
    "nome": "NOAA SWPC: clima espacial (vento solar, Kp, GOES raios-X e prÃ³tons)",
    "url": "https://www.swpc.noaa.gov/products-and-data",
    "conteudo": "ObservaÃ§Ãµes de vento solar (inclusive ACE em tempo real), Ã­ndice Kp planetÃ¡rio, Ã­ndices K e A de estaÃ§Ãµes, fluxo de raios-X e de prÃ³tons do GOES, grÃ¡ficos de atividade geomagnÃ©tica e arquivos hospedados no NCEI.",
    "gratuito": "Sim",
    "acesso": "Produtos e arquivos online (dados histÃ³ricos no NCEI).",
    "licenca": "A pÃ¡gina nÃ£o traz polÃ­tica de dados; sÃ³ links de aviso e privacidade.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://www.spaceweather.gov/products-and-data",
    "problemas": [
      "RadiaÃ§Ã£o e ambiente espacial e atmosfÃ©rico",
      "NavegaÃ§Ã£o, GNSS e ionosfera"
    ],
    "tecnicas": [
      "ExperimentaÃ§Ã£o, ensaios e instrumentaÃ§Ã£o"
    ],
    "temas": [
      "RadiaÃ§Ã£o cÃ³smica e aeronaves",
      "GNSS e ionosfera"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 69,
    "nome": "NASA OMNIWeb Plus (SPDF)",
    "url": "https://omniweb.gsfc.nasa.gov/",
    "conteudo": "Dados de campo magnÃ©tico, plasma e partÃ­culas energÃ©ticas relevantes Ã  heliosfera, com fluxos de partÃ­culas energÃ©ticas, cruzamentos de magnetopausa e de bow shock e acesso por FTP.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "NavegaÃ§Ã£o web e FTP; custo e polÃ­tica de uso nÃ£o aparecem na pÃ¡gina.",
    "licenca": "NÃ£o declarada; a pÃ¡gina aponta para pÃ¡ginas de DOI e agradecimentos nÃ£o lidas.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://omniweb.gsfc.nasa.gov/",
    "problemas": [
      "RadiaÃ§Ã£o e ambiente espacial e atmosfÃ©rico"
    ],
    "tecnicas": [
      "ExperimentaÃ§Ã£o, ensaios e instrumentaÃ§Ã£o"
    ],
    "temas": [
      "RadiaÃ§Ã£o cÃ³smica e aeronaves"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 70,
    "nome": "MIT-BIH Arrhythmia Database (PhysioNet)",
    "url": "https://physionet.org/content/mitdb/1.0.0/",
    "conteudo": "48 registros de ECG ambulatorial de cerca de 30 min, 47 sujeitos (1975â1979), 360 amostras/s por canal, cerca de 110.000 anotaÃ§Ãµes de batimento feitas por dois ou mais cardiologistas.",
    "gratuito": "Sim",
    "acesso": "Download aberto no PhysioNet.",
    "licenca": "Open Data Commons Attribution License v1.0",
    "classe": "Aberta",
    "comercial": "Sim, com atribuiÃ§Ã£o",
    "tamanho": "~104,3 MB descomprimido (73,5 MB em ZIP)",
    "citacao": "Moody e Mark, IEEE Eng. Med. Biol. 20(3):45â50, 2001; DOI do dataset 10.13026/C2F305.",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://physionet.org/content/mitdb/1.0.0/",
    "problemas": [
      "SaÃºde e aplicaÃ§Ãµes biomÃ©dicas"
    ],
    "tecnicas": [
      "Processamento de sinais e imagens",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes neurais artificiais (clÃ¡ssicas)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 71,
    "nome": "MIMIC-IV (PhysioNet)",
    "url": "https://physionet.org/content/mimiciv/",
    "conteudo": "ProntuÃ¡rios eletrÃ´nicos desidentificados do Beth Israel Deaconess (pronto-socorro e UTI): 364.627 pessoas, 546.028 internaÃ§Ãµes e 94.458 estadias em UTI (v3.0). MÃ³dulos hosp e icu, ligÃ¡veis a MIMIC-IV-Note, -ED e -CXR.",
    "gratuito": "Sim, com credenciamento",
    "acesso": "Exige usuÃ¡rio credenciado do PhysioNet, treinamento CITI 'Data or Specimens Only Research' e assinatura do acordo de uso.",
    "licenca": "PhysioNet Credentialed Health Data License 1.5.0 e Data Use Agreement 1.5.0",
    "classe": "Termos prÃ³prios ou acesso controlado",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Johnson et al., MIMIC-IV (v3.1), PhysioNet, doi:10.13026/kpb9-mt58.",
    "obs": "Dados de pacientes: cuidado com privacidade e termos de redistribuiÃ§Ã£o.",
    "confianca": "Confirmado",
    "fonte": "https://physionet.org/content/mimiciv/",
    "problemas": [
      "SaÃºde e aplicaÃ§Ãµes biomÃ©dicas"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Conhecimento, mineraÃ§Ã£o de dados e lÃ³gica nebulosa"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 72,
    "nome": "Portal de Dados Abertos da SaÃºde (Brasil)",
    "url": "https://dadosabertos.saude.gov.br/",
    "conteudo": "CatÃ¡logo com 19 conjuntos em temas como arboviroses, assistÃªncia Ã  saÃºde, farmacÃªutica, atenÃ§Ã£o primÃ¡ria, ciÃªncia e tecnologia e diagnÃ³sticos e tratamentos, alÃ©m de uma API de dados abertos. SRAG, vacinaÃ§Ã£o, SIM e SINASC nÃ£o aparecem na pÃ¡gina inicial.",
    "gratuito": "Sim",
    "acesso": "Portal e API (apidadosabertos.saude.gov.br). O endereÃ§o antigo opendatasus.saude.gov.br redireciona.",
    "licenca": "O portal declara Creative Commons AtribuiÃ§Ã£o-SemDerivaÃ§Ãµes 3.0 para seu conteÃºdo. NÃ£o confirma que valha para cada conjunto.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Formatos nÃ£o listados na pÃ¡gina inicial.",
    "confianca": "Parcial",
    "fonte": "https://dadosabertos.saude.gov.br/",
    "problemas": [
      "SaÃºde e aplicaÃ§Ãµes biomÃ©dicas"
    ],
    "tecnicas": [
      "Conhecimento, mineraÃ§Ã£o de dados e lÃ³gica nebulosa"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 73,
    "nome": "SkyWater SKY130 PDK (Google e SkyWater)",
    "url": "https://github.com/google/skywater-pdk",
    "conteudo": "Kit de processo (PDK) aberto de 130 nm: regras de projeto, arquivos de suporte a ferramentas de EDA, bibliotecas de cÃ©lulas primitivas, modelos analÃ³gicos e vÃ¡rias bibliotecas de cÃ©lulas digitais padrÃ£o.",
    "gratuito": "Sim",
    "acesso": "git clone do repositÃ³rio no GitHub; documentaÃ§Ã£o em skywater-pdk.rtfd.io.",
    "licenca": "Apache 2.0",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "~7 GB (bibliotecas de cÃ©lulas mais recentes)",
    "citacao": "",
    "obs": "Estado 'alfa' e 'experimental', nÃ£o destinado a produÃ§Ã£o. Permite prototipar e fabricar chips de teste de forma aberta.",
    "confianca": "Confirmado",
    "fonte": "https://github.com/google/skywater-pdk",
    "problemas": [
      "EletrÃ´nica, circuitos e computaÃ§Ã£o embarcada"
    ],
    "tecnicas": [
      "Projeto de hardware e sistemas embarcados"
    ],
    "temas": [
      "Circuitos e hardware digital"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 74,
    "nome": "NASA PCoE: envelhecimento de IGBT, MOSFET e capacitores",
    "url": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "conteudo": "Envelhecimento acelerado de seis IGBTs por sobretensÃ£o tÃ©rmica; MOSFETs de potÃªncia atÃ© a falha; capacitores sob estresse elÃ©trico de 10, 12 e 14 V com espectroscopia de impedÃ¢ncia.",
    "gratuito": "Parcial",
    "acesso": "IGBT e capacitores (estresse elÃ©trico): download direto. MOSFET: link listado, referÃªncia fora do ar. Capacitores-2: contato com a NASA.",
    "licenca": "Sem licenÃ§a declarada; uso por conta e risco, com agradecimento ao repositÃ³rio.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "problemas": [
      "EletrÃ´nica, circuitos e computaÃ§Ã£o embarcada"
    ],
    "tecnicas": [
      "Confiabilidade, risco e seguranÃ§a de sistemas",
      "ExperimentaÃ§Ã£o, ensaios e instrumentaÃ§Ã£o"
    ],
    "temas": [
      "Circuitos e hardware digital"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 75,
    "nome": "OpenStreetMap",
    "url": "https://www.openstreetmap.org/",
    "conteudo": "Dados geogrÃ¡ficos colaborativos do mundo todo (vias, edificaÃ§Ãµes, uso do solo).",
    "gratuito": "Sim",
    "acesso": "ExportaÃ§Ã£o e extratos; a API, os tiles e o Nominatim tÃªm polÃ­ticas de uso prÃ³prias e nÃ£o hÃ¡ API de mapas gratuita para terceiros.",
    "licenca": "Open Database License (ODbL). Atribuir ao OpenStreetMap e declarar a licenÃ§a; derivados sÃ³ podem ser distribuÃ­dos sob a mesma licenÃ§a.",
    "classe": "Aberta com compartilhamento igual",
    "comercial": "Sim, com atribuiÃ§Ã£o e compartilhamento igual",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://www.openstreetmap.org/copyright",
    "problemas": [
      "Transporte e logÃ­stica",
      "VANTs, robÃ´s e veÃ­culos autÃ´nomos"
    ],
    "tecnicas": [
      "OtimizaÃ§Ã£o e pesquisa operacional"
    ],
    "temas": [
      "NavegaÃ§Ã£o, robÃ³tica e fusÃ£o sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 76,
    "nome": "CVRPLIB (PUC-Rio)",
    "url": "https://galgos.inf.puc-rio.br/cvrplib/index.php/en/",
    "conteudo": "InstÃ¢ncias de benchmark para roteamento de veÃ­culos capacitado (conjuntos A, B, E, F, M, P, CMT, tai, Golden, Li, X, AGS, DIMACS, XML, XL) e com janelas de tempo (Solomon), com melhores soluÃ§Ãµes conhecidas e indicaÃ§Ã£o de otimalidade.",
    "gratuito": "Sim",
    "acesso": "Download direto das instÃ¢ncias.",
    "licenca": "NÃ£o declarada na pÃ¡gina; hÃ¡ link 'Terms of Use' nÃ£o lido.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Para o conjunto X: Uchoa et al., European J. of Operational Research, 2017, doi:10.1016/j.ejor.2016.08.012.",
    "obs": "Biblioteca brasileira. A pÃ¡gina mostra logos de PUC-Rio, UFF e UFPB, mas nÃ£o diz quem a mantÃ©m.",
    "confianca": "Parcial",
    "fonte": "https://galgos.inf.puc-rio.br/cvrplib/index.php/en/",
    "problemas": [
      "Transporte e logÃ­stica"
    ],
    "tecnicas": [
      "OtimizaÃ§Ã£o e pesquisa operacional"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 77,
    "nome": "TSPLIB",
    "url": "http://comopt.ifi.uni-heidelberg.de/software/TSPLIB95/",
    "conteudo": "InstÃ¢ncias de caixeiro-viajante (simÃ©trico e assimÃ©trico), ciclo hamiltoniano, ordenaÃ§Ã£o sequencial e roteamento capacitado, com soluÃ§Ãµes Ã³timas ou melhores conhecidas.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "Download direto na pÃ¡gina.",
    "licenca": "NÃ£o declarada na pÃ¡gina.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A biblioteca nÃ£o pretende receber novas instÃ¢ncias.",
    "confianca": "Parcial",
    "fonte": "http://comopt.ifi.uni-heidelberg.de/software/TSPLIB95/",
    "problemas": [
      "Transporte e logÃ­stica"
    ],
    "tecnicas": [
      "OtimizaÃ§Ã£o e pesquisa operacional"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 78,
    "nome": "MIPLIB 2017",
    "url": "https://miplib.zib.de/",
    "conteudo": "Biblioteca de instÃ¢ncias reais de programaÃ§Ã£o inteira mista para comparar solvers: conjunto Benchmark (240 instÃ¢ncias) e Collection (bem maior). InstÃ¢ncias marcadas como fÃ¡ceis, difÃ­ceis ou abertas.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "PÃ¡gina de download.",
    "licenca": "NÃ£o declarada na pÃ¡gina.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Gleixner et al., MIPLIB 2017, Mathematical Programming Computation, 2021, doi:10.1007/s12532-020-00194-3.",
    "obs": "Alguns dados foram convertidos ou digitados Ã  mÃ£o; pode haver erros.",
    "confianca": "Parcial",
    "fonte": "https://miplib.zib.de/",
    "problemas": [
      "Transporte e logÃ­stica"
    ],
    "tecnicas": [
      "OtimizaÃ§Ã£o e pesquisa operacional"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 79,
    "nome": "UCI Machine Learning Repository",
    "url": "https://archive.ics.uci.edu/",
    "conteudo": "689 conjuntos de dados para aprendizado de mÃ¡quina, aceitando doaÃ§Ãµes da comunidade.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "NavegaÃ§Ã£o e download no site; hÃ¡ login.",
    "licenca": "A pÃ¡gina inicial nÃ£o declara licenÃ§a. Confira a pÃ¡gina de cada conjunto.",
    "classe": "NÃ£o confirmada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://archive.ics.uci.edu/",
    "problemas": [],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Conhecimento, mineraÃ§Ã£o de dados e lÃ³gica nebulosa"
    ],
    "temas": [
      "Redes neurais artificiais (clÃ¡ssicas)",
      "MineraÃ§Ã£o de dados e sistemas de conhecimento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 80,
    "nome": "DaISy: Database for the Identification of Systems (KU Leuven)",
    "url": "https://homes.esat.kuleuven.be/~smc/daisy/",
    "conteudo": "Datasets reais de identificaÃ§Ã£o de sistemas em nove categorias: indÃºstria de processos, elÃ©trica e eletrÃ´nica, mecÃ¢nica, biomÃ©dica, bioquÃ­mica, economÃ©trica, ambiental, clÃ¡ssica e tÃ©rmica.",
    "gratuito": "Sim",
    "acesso": "FTP e pÃ¡gina de datasets.",
    "licenca": "Sem termos declarados.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A pÃ¡gina foi modificada pela Ãºltima vez em 22/02/2008. Pode estar desatualizada.",
    "confianca": "Parcial",
    "fonte": "https://homes.esat.kuleuven.be/~smc/daisy/",
    "problemas": [],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores",
      "Teoria e projeto de controle"
    ],
    "temas": [
      "Controle de sistemas"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 81,
    "nome": "Nonlinear System Identification Benchmarks",
    "url": "https://www.nonlinearbenchmark.org/",
    "conteudo": "15 datasets de sistemas dinÃ¢micos nÃ£o lineares (Silverbox, Wiener-Hammerstein, Cascaded Tanks, F-16 Ground Vibration Test, NanoDrone, Fine Steering Mirror, Coupled Electric Drives, Industrial Robot, entre outros). Os com asterisco tÃªm leaderboard e loaders em Python.",
    "gratuito": "Sim",
    "acesso": "PÃ¡ginas de cada dataset e GitHub.",
    "licenca": "NÃ£o declarada; hÃ¡ link 'Disclaimer' nÃ£o lido.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "Schoukens, Champneys, Beintema e Rogers, Data-Centric Engineering, 2026;7:e40, doi:10.1017/dce.2026.10067.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://www.nonlinearbenchmark.org/",
    "problemas": [],
    "tecnicas": [
      "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores",
      "Teoria e projeto de controle"
    ],
    "temas": [
      "Controle de sistemas"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 82,
    "nome": "Case Western Reserve University Bearing Data Center",
    "url": "https://engineering.case.edu/bearingdatacenter",
    "conteudo": "VibraÃ§Ã£o de rolamentos de esferas normais e com falhas semeadas por eletroerosÃ£o (0,007 a 0,040 polegada) nas pistas interna e externa e na esfera. Motor de 2 hp, cargas de 0 a 3 hp, 1797 a 1720 rpm.",
    "gratuito": "NÃ£o confirmado",
    "acesso": "PÃ¡gina de arquivos de dados.",
    "licenca": "NÃ£o declarada; avisos legais do site nÃ£o lidos.",
    "classe": "Sem licenÃ§a declarada",
    "comercial": "NÃ£o confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Benchmark muito usado em diagnÃ³stico de falhas com aprendizado de mÃ¡quina.",
    "confianca": "Parcial",
    "fonte": "https://engineering.case.edu/bearingdatacenter",
    "problemas": [],
    "tecnicas": [
      "Confiabilidade, risco e seguranÃ§a de sistemas",
      "Processamento de sinais e imagens",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes neurais artificiais (clÃ¡ssicas)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 100,
    "nome": "ImageNet",
    "url": "https://www.image-net.org/",
    "conteudo": "Banco de dados massivo de imagens anotadas segundo a hierarquia WordNet, muito usado em treinamento de redes convolucionais.",
    "gratuito": "Sim",
    "acesso": "Requer cadastro.",
    "licenca": "Uso não comercial / acadêmico",
    "classe": "Só pesquisa ou não comercial",
    "comercial": "Não",
    "tamanho": "~150 GiB",
    "citacao": "Deng et al., ImageNet: A large-scale hierarchical image database, CVPR 2009.",
    "obs": "Fundacional para a explosão do Deep Learning a partir de 2012.",
    "confianca": "Confirmado",
    "fonte": "https://www.image-net.org/",
    "problemas": [
      "Visão Computacional"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecção"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 101,
    "nome": "MIMIC-IV",
    "url": "https://physionet.org/content/mimiciv/",
    "conteudo": "Dados desidentificados de saúde de pacientes internados em UTI, incluindo sinais vitais, laboratório, medicações.",
    "gratuito": "Sim",
    "acesso": "Requer curso de ética em pesquisa e aprovação no PhysioNet.",
    "licenca": "PhysioNet Credentialed Health Data License",
    "classe": "Restrito / Dados Sensíveis",
    "comercial": "Não",
    "tamanho": "Dezenas de GiB",
    "citacao": "Johnson et al., MIMIC-IV, a freely accessible electronic health record dataset, Scientific Data 2023.",
    "obs": "Maior dataset de EHR público.",
    "confianca": "Confirmado",
    "fonte": "https://physionet.org/content/mimiciv/",
    "problemas": [
      "Saúde e Medicina"
    ],
    "tecnicas": [
      "Mineração de dados e sistemas de conhecimento"
    ],
    "temas": [
      "Análise de dados clínicos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 102,
    "nome": "SQuAD 2.0",
    "url": "https://rajpurkar.github.io/SQuAD-explorer/",
    "conteudo": "Stanford Question Answering Dataset: perguntas feitas por humanos sobre trechos da Wikipedia. A v2.0 inclui perguntas sem resposta no texto.",
    "gratuito": "Sim",
    "acesso": "Download aberto.",
    "licenca": "CC BY-SA 4.0",
    "classe": "Aberta com compartilhamento igual",
    "comercial": "Sim",
    "tamanho": "~40 MiB",
    "citacao": "Rajpurkar et al., ACL 2018.",
    "obs": "Clássico em NLP.",
    "confianca": "Confirmado",
    "fonte": "https://rajpurkar.github.io/SQuAD-explorer/",
    "problemas": [
      "Processamento de Linguagem Natural"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Processamento de Linguagem Natural"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 103,
    "nome": "Titanic Passenger Data",
    "url": "https://www.kaggle.com/c/titanic/data",
    "conteudo": "Dados dos passageiros do Titanic (idade, sexo, classe, etc) e indicador de sobrevivência.",
    "gratuito": "Sim",
    "acesso": "Download via Kaggle.",
    "licenca": "Domínio público",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "< 1 MiB",
    "citacao": "Kaggle Titanic Competition.",
    "obs": "O dataset 'Hello World' de Ciência de Dados.",
    "confianca": "Confirmado",
    "fonte": "https://www.kaggle.com/",
    "problemas": [
      "Educação em Ciência de Dados"
    ],
    "tecnicas": [
      "Conhecimento, mineração de dados e lógica nebulosa"
    ],
    "temas": [
      "Mineração de dados e sistemas de conhecimento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 104,
    "nome": "NYC Taxi and Limousine Commission",
    "url": "https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page",
    "conteudo": "Registros mensais detalhados de viagens de táxi e carros de aplicativo em NY (locais, duração, tarifa).",
    "gratuito": "Sim",
    "acesso": "Download aberto.",
    "licenca": "Dados públicos do governo de NY",
    "classe": "Domínio Público / Aberta",
    "comercial": "Sim",
    "tamanho": "Dezenas de GiB",
    "citacao": "NYC TLC",
    "obs": "Muito usado para benchmarks de data warehousing, séries temporais e análise geoespacial.",
    "confianca": "Confirmado",
    "fonte": "https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page",
    "problemas": [
      "Transporte e logística",
      "Economia Urbana"
    ],
    "tecnicas": [
      "Otimização e pesquisa operacional",
      "Mineração de dados e sistemas de conhecimento"
    ],
    "temas": [
      "Planejamento urbano",
      "Big Data"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 105,
    "nome": "Dreaddit (Mental Health on Reddit)",
    "url": "https://github.com/thepanacealab/dreaddit",
    "conteudo": "Um dataset de textos do Reddit focado em estresse e saúde mental. Inclui postagens de subreddits relacionados a ansiedade, PTSD e estresse cotidiano.",
    "gratuito": "Sim",
    "acesso": "Download aberto via GitHub/Zenodo.",
    "licenca": "Atribuição não comercial",
    "classe": "Só pesquisa ou não comercial",
    "comercial": "Não",
    "tamanho": "Alguns MiB",
    "citacao": "Turcan & McKeown, Dreaddit: A Reddit Dataset for Stress Analysis in Social Media, ACL 2019.",
    "obs": "Ótimo para NLP focado em psicologia e saúde mental.",
    "confianca": "Confirmado",
    "fonte": "https://github.com/thepanacealab/dreaddit",
    "problemas": [
      "Saúde Mental e Psicologia",
      "Processamento de Linguagem Natural"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Mineração de dados e sistemas de conhecimento"
    ],
    "temas": [
      "Processamento de Linguagem Natural",
      "Análise de sentimentos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 106,
    "nome": "OSMI Mental Health in Tech Survey",
    "url": "https://www.kaggle.com/datasets/osmi/mental-health-in-tech-survey",
    "conteudo": "Pesquisa sobre saúde mental no ambiente de trabalho da área de tecnologia. Frequência de transtornos, suporte das empresas e estigma.",
    "gratuito": "Sim",
    "acesso": "Download via Kaggle / OSMI.",
    "licenca": "CC BY-SA 4.0",
    "classe": "Aberta com compartilhamento igual",
    "comercial": "Sim",
    "tamanho": "< 1 MiB",
    "citacao": "Open Sourcing Mental Illness (OSMI).",
    "obs": "Pesquisa anual que levanta o impacto do ambiente de tech na psicologia.",
    "confianca": "Confirmado",
    "fonte": "https://osmihelp.org/research",
    "problemas": [
      "Saúde Mental e Psicologia",
      "Sociologia e Comportamento"
    ],
    "tecnicas": [
      "Conhecimento, mineração de dados e lógica nebulosa"
    ],
    "temas": [
      "Mineração de dados e sistemas de conhecimento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 107,
    "nome": "DAIC-WOZ (Distress Analysis Interview Corpus)",
    "url": "https://dcapswoz.ict.usc.edu/",
    "conteudo": "Entrevistas clínicas para diagnóstico de condições psicológicas (depressão, ansiedade, PTSD), incluindo áudio, vídeo e transcrições.",
    "gratuito": "Sim",
    "acesso": "Requer assinatura de termo de uso.",
    "licenca": "Uso exclusivamente em pesquisa",
    "classe": "Restrito / Dados Sensíveis",
    "comercial": "Não",
    "tamanho": "Dezenas de GiB",
    "citacao": "Gratch et al., The distress analysis interview corpus facilities for audio, video, and text, LREC 2014.",
    "obs": "Padrão-ouro em análise multimodal de afeto e depressão.",
    "confianca": "Confirmado",
    "fonte": "https://dcapswoz.ict.usc.edu/",
    "problemas": [
      "Saúde Mental e Psicologia",
      "Reconhecimento de Emoções"
    ],
    "tecnicas": [
      "Processamento de sinais e imagens",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Análise de áudio",
      "Visão computacional",
      "Processamento de Linguagem Natural"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 108,
    "nome": "OASIS (Open Access Series of Imaging Studies)",
    "url": "https://www.oasis-brains.org/",
    "conteudo": "Imagens de ressonância magnética (MRI) do cérebro de indivíduos saudáveis e com Doença de Alzheimer.",
    "gratuito": "Sim",
    "acesso": "Requer termo de compromisso aprovado.",
    "licenca": "Uso acadêmico",
    "classe": "Só pesquisa ou não comercial",
    "comercial": "Não",
    "tamanho": "Centenas de GiB (várias versões)",
    "citacao": "Marcus et al., Open Access Series of Imaging Studies (OASIS), J Cogn Neurosci 2007.",
    "obs": "Fundacional para estudo neuropsicológico e cognitivo via neuroimagem.",
    "confianca": "Confirmado",
    "fonte": "https://www.oasis-brains.org/",
    "problemas": [
      "Saúde e Medicina",
      "Saúde Mental e Psicologia"
    ],
    "tecnicas": [
      "Processamento de sinais e imagens",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Análise de imagens médicas"
    ],
    "verificado_em": "2026-10-08"
  }
];

const filterTemas = ["Todos", ...["Análise de dados clínicos", "Análise de imagens médicas", "Análise de sentimentos", "Análise de áudio", "Aprendizado por reforÃ§o e robÃ³tica inteligente", "Aprendizado profundo para imagens e detecÃ§Ã£o", "Aprendizado profundo para imagens e detecção", "Big Data", "Circuitos e hardware digital", "Controle de sistemas", "Engenharia de sistemas e seguranÃ§a (STPA)", "Engenharia de software", "FotÃ´nica e enlaces Ã³pticos", "GNSS e ionosfera", "GestÃ£o tecnolÃ³gica e defesa", "HipersÃ´nica, escoamento e CFD", "Materiais avanÃ§ados e polÃ­meros", "MineraÃ§Ã£o de dados e sistemas de conhecimento", "Mineração de dados e sistemas de conhecimento", "NavegaÃ§Ã£o, robÃ³tica e fusÃ£o sensorial", "Planejamento urbano", "Processamento de Linguagem Natural", "PropulsÃ£o a propelente sÃ³lido", "Radar SAR e sensoriamento", "RadiaÃ§Ã£o cÃ³smica e aeronaves", "Redes e protocolos de comunicaÃ§Ã£o", "Redes neurais artificiais (clÃ¡ssicas)", "VANTs e sistemas aÃ©reos autÃ´nomos", "Visão computacional"]];
const filterTecnicas = ["Todos", ...["Aprendizado por reforÃ§o e agentes", "ComunicaÃ§Ãµes digitais (modulaÃ§Ã£o, codificaÃ§Ã£o, canal)", "Confiabilidade, risco e seguranÃ§a de sistemas", "Conhecimento, mineraÃ§Ã£o de dados e lÃ³gica nebulosa", "Conhecimento, mineração de dados e lógica nebulosa", "Eletromagnetismo, RF e fotÃ´nica", "Engenharia de software e de sistemas", "EstimaÃ§Ã£o, filtragem e fusÃ£o de sensores", "ExperimentaÃ§Ã£o, ensaios e instrumentaÃ§Ã£o", "Mineração de dados e sistemas de conhecimento", "Modelagem e simulaÃ§Ã£o numÃ©rica (CFD, elementos finitos)", "MÃ©todos de gestÃ£o e apoio Ã  decisÃ£o", "OtimizaÃ§Ã£o e pesquisa operacional", "Otimização e pesquisa operacional", "Processamento de sinais e imagens", "Projeto de hardware e sistemas embarcados", "Redes neurais e aprendizado profundo", "Redes, protocolos e seguranÃ§a da informaÃ§Ã£o", "SÃ­ntese e caracterizaÃ§Ã£o de materiais", "Teoria e projeto de controle"]];
const filterProblemas = ["Todos", ...["Aeronaves, voo e trÃ¡fego aÃ©reo", "Antenas, RF e comunicaÃ§Ãµes Ã³pticas", "ComunicaÃ§Ãµes sem fio e transmissÃ£o", "Defesa e guerra eletrÃ´nica", "Economia Urbana", "Educação em Ciência de Dados", "EletrÃ´nica, circuitos e computaÃ§Ã£o embarcada", "Energia, baterias e eletroquÃ­mica", "GestÃ£o, inovaÃ§Ã£o e polÃ­ticas", "Materiais e estruturas aeroespaciais", "NavegaÃ§Ã£o, GNSS e ionosfera", "Processamento de Linguagem Natural", "PropulsÃ£o, foguetes e hipersÃ´nica", "Radar, SAR e sensoriamento remoto", "RadiaÃ§Ã£o e ambiente espacial e atmosfÃ©rico", "Reconhecimento de Emoções", "Redes de computadores e internet", "SatÃ©lites e missÃµes espaciais", "SaÃºde e aplicaÃ§Ãµes biomÃ©dicas", "Saúde Mental e Psicologia", "Saúde e Medicina", "SeguranÃ§a cibernÃ©tica", "Sociologia e Comportamento", "Software e sistemas de informaÃ§Ã£o", "Transporte e logÃ­stica", "Transporte e logística", "VANTs, robÃ´s e veÃ­culos autÃ´nomos", "Visão Computacional"]];
const filterClasses = ["Todos", ...["Aberta", "Aberta com compartilhamento igual", "Domínio Público / Aberta", "NÃ£o confirmada", "Restrito / Dados Sensíveis", "Sem licenÃ§a declarada", "SÃ³ pesquisa ou nÃ£o comercial", "Só pesquisa ou não comercial", "Termos prÃ³prios ou acesso controlado"]];
