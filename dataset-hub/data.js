const allDatasets = [
  {
    "id": 1,
    "nome": "BigEarthNet v2.0 (reBEN)",
    "url": "https://bigearth.net/",
    "conteudo": "549.488 pares de recortes Sentinel-1 (SAR) e Sentinel-2, com mapa de referência por pixel e rótulos multirrótulo de cobertura do solo (19 classes, CORINE 2018). Dez países europeus, jun/2017 a mai/2018.",
    "gratuito": "Sim",
    "acesso": "Download aberto no Zenodo (registro 10891137).",
    "licenca": "Community Data License Agreement – Permissive 1.0 (CDLA-Permissive-1.0)",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "~59 GiB (Sentinel-2) + ~51 GiB (Sentinel-1), formato tar.zst",
    "citacao": "Clasen et al., reBEN: Refined BigEarthNet Dataset for Remote Sensing Image Analysis, IEEE IGARSS 2025 (arXiv:2407.03653).",
    "obs": "Alguns recortes têm neve, nuvem ou sombra; a página recomenda excluí-los em classificação de cenas. Cobre só a Europa.",
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
      "Aprendizado profundo para imagens e detecção",
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 2,
    "nome": "SEN12MS",
    "url": "https://mediatum.ub.tum.de/1474000",
    "conteudo": "180.662 trincas de recortes: Sentinel-1 SAR dupla polarização (VV e VH), Sentinel-2 com 13 bandas e mapas de cobertura do solo MODIS (IGBP, LCCS). GeoTIFF de 16 bits, quatro estações do ano, todos os continentes.",
    "gratuito": "Sim",
    "acesso": "Download no servidor da TUM (mediaTUM).",
    "licenca": "Não confirmada nesta sessão. Confira o campo de licença do registro mediaTUM e o README do pacote.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Schmitt et al., SEN12MS, ISPRS Annals IV-2/W7, 2019 (arXiv:1906.07789).",
    "obs": "A página do mediaTUM bloqueou a consulta automática.",
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
      "Aprendizado profundo para imagens e detecção",
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 3,
    "nome": "SpaceNet (Registry of Open Data on AWS)",
    "url": "https://registry.opendata.aws/spacenet/",
    "conteudo": "Imagens de satélite de alta resolução com feições mapeadas (prédios, estradas, estradas e prédios alagados, desenvolvimento urbano multitemporal). Inclui dados do fMoW da IARPA. Atualizado a cada trimestre.",
    "gratuito": "Sim",
    "acesso": "Bucket S3 público (s3://spacenet-dataset), sem conta AWS: aws s3 ls --no-sign-request.",
    "licenca": "Variada por conjunto (ver spacenet.ai/datasets). A página do registro não nomeia uma licença única.",
    "classe": "Não confirmada",
    "comercial": "Depende do conjunto",
    "tamanho": "",
    "citacao": "",
    "obs": "Confira a licença de cada desafio antes de reutilizar. Cite a data de acesso e a URL do registro.",
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
      "Aprendizado profundo para imagens e detecção",
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 4,
    "nome": "Copernicus Sentinel (Data Space Ecosystem)",
    "url": "https://dataspace.copernicus.eu/",
    "conteudo": "Dados das missões Sentinel (inclui Sentinel-1 SAR e Sentinel-2 multiespectral), serviços e dados de contribuição. Navegação e busca pelo Copernicus Browser.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Registro de usuário exigido para baixar. Contas múltiplas para burlar cotas violam os termos.",
    "licenca": "Acesso aos dados Sentinel em base livre, completa e aberta, regido pelo Aviso Legal do Copernicus Sentinel (documento à parte).",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "",
    "citacao": "",
    "obs": "Outros conteúdos do portal (não Sentinel) são só para uso não comercial. O texto exato de atribuição está no Aviso Legal, que não consegui ler (PDF).",
    "confianca": "Confirmado",
    "fonte": "https://dataspace.copernicus.eu/terms-and-conditions",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "Radiação e ambiente espacial e atmosférico"
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
    "conteudo": "Imagens dos satélites sino-brasileiros CBERS-4 (MUX, AWFI, PAN5M, PAN10M) e CBERS-4A (MUX, WFI, WPM), nível 4 ortorretificado, em Cloud Optimized GeoTIFF. Atualizado diariamente. Imagens gravadas e processadas pelo INPE.",
    "gratuito": "Sim",
    "acesso": "Buckets S3 públicos (brazil-eosats) e catálogo STAC, sem conta AWS.",
    "licenca": "A página aponta para Creative Commons CC BY-SA 3.0 (link, sem nomear no texto).",
    "classe": "Aberta com compartilhamento igual",
    "comercial": "Sim, com atribuição e compartilhamento igual",
    "tamanho": "Cloud Optimized GeoTIFF; volume total não informado",
    "citacao": "",
    "obs": "Dado nacional e útil para trabalhos de sensoriamento remoto no ITA/INPE. Entrada do registro mantida por Frederico Liporace; a página não descreve o INPE como mantenedor.",
    "confianca": "Confirmado",
    "fonte": "https://registry.opendata.aws/cbers/",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "Satélites e missões espaciais"
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
    "conteudo": "Mapas anuais de supressão de vegetação nativa (PRODES) nos biomas brasileiros e na Amazônia Legal, alertas quase em tempo real (DETER) para Amazônia e Cerrado, mapas de vegetação do Cerrado e painéis de focos de queimada.",
    "gratuito": "Sim",
    "acesso": "Download de vetores e rasters; DETER em Shapefile.",
    "licenca": "Creative Commons Atribuição-CompartilhaIgual 4.0 (CC BY-SA 4.0), segundo a página. Há uma página à parte, 'Citações e Licença de Uso'.",
    "classe": "Aberta com compartilhamento igual",
    "comercial": "Sim, com atribuição e compartilhamento igual",
    "tamanho": "",
    "citacao": "",
    "obs": "A cópia que consultei exibia conteúdo estranho (anúncios) em uma seção do painel. Acesse pelo navegador e confira se a página está íntegra. Dados experimentais de DETER (Pantanal e áreas não florestais) podem mudar.",
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
    "conteudo": "Imagens de satélite com 0,3 m de resolução, 1 milhão de objetos em 60 classes, 1.415 km². Foco em resposta a desastres. Anotação por caixas delimitadoras.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Cadastro no desafio xView 2018 e aceite dos Termos e Condições.",
    "licenca": "A página consultada não declara a licença; remete a 'Terms and Conditions' (não lidos).",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Confira os termos antes de usar. A página fala em imagens de satélite sem dizer o sensor; pelo que sei é imagem óptica, não SAR (não confirmado nesta sessão).",
    "confianca": "Parcial",
    "fonte": "http://xviewdataset.org/",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "Defesa e guerra eletrônica"
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
    "id": 8,
    "nome": "SAMPLE (AFRL): SAR sintético e medido pareado",
    "url": "https://github.com/benjaminlewis-afrl/SAMPLE_dataset_public",
    "conteudo": "Imagens SAR medidas do conjunto MSTAR, cada uma pareada com uma imagem SAR simulada. Versão pública cobre azimutes de 10° a 80°. Arquivos .mat e PNG.",
    "gratuito": "Sim",
    "acesso": "Repositório público no GitHub.",
    "licenca": "Distribution A: aprovado para divulgação pública, distribuição ilimitada. Não nomeia licença de software ou de dados.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Lewis et al., SPIE Proc. 10987, 2019, doi:10.1117/12.2523460.",
    "obs": "Útil para reconhecimento automático de alvos SAR e transferência de simulação para dado real.",
    "confianca": "Parcial",
    "fonte": "https://github.com/benjaminlewis-afrl/SAMPLE_dataset_public",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "Defesa e guerra eletrônica"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecção",
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 9,
    "nome": "MSTAR (AFRL/DARPA)",
    "url": "https://www.sdms.afrl.af.mil/index.php?collection=mstar",
    "conteudo": "Conjunto clássico de imagens SAR de veículos terrestres para reconhecimento automático de alvos, dos anos 1990. A literatura o descreve como limitado a poucas dezenas de milhares de recortes e com acurácias acima de 99% de classificação.",
    "gratuito": "Não confirmado",
    "acesso": "Hospedado no portal SDMS do AFRL. A página não abriu nesta sessão (conexão reiniciada).",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Sucessores maiores citados na literatura: NUDT4MSTAR (>190.000 imagens, 40 tipos de alvo) e ATRNet-STAR (40 categorias de veículos). Não verifiquei a licença deles.",
    "confianca": "Não verificado",
    "fonte": "https://www.preprints.org/manuscript/202308.0837",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "Defesa e guerra eletrônica"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecção",
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 10,
    "nome": "Catálogo de imagens do INPE (CBERS, Amazonia-1, Landsat e outros)",
    "url": "http://www.dgi.inpe.br/catalogo/",
    "conteudo": "Catálogo para busca e download de imagens de satélite distribuídas pelo INPE.",
    "gratuito": "Não confirmado",
    "acesso": "A página consultada só mostrou o título; não consegui ler condições de acesso nem política de uso.",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Use o registro CBERS no AWS (acima) como alternativa com condições documentadas.",
    "confianca": "Não verificado",
    "fonte": "http://www.dgi.inpe.br/catalogo/",
    "problemas": [
      "Radar, SAR e sensoriamento remoto",
      "Satélites e missões espaciais"
    ],
    "tecnicas": [],
    "temas": [
      "Radar SAR e sensoriamento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 11,
    "nome": "EMBRACE/INPE: cintilação ionosférica (S4 e σφ)",
    "url": "https://embracedata.inpe.br/scintillation/readme_scintillation.html",
    "conteudo": "Dados de cintilação (índice S4 e σφ) de receptores GNSS de várias redes no Brasil: arquivos por ano, estação e dia (27 colunas, S4 total na coluna 5), mapas gradeados S4 e σφ e um mapa quase em tempo real (10 min).",
    "gratuito": "Sim",
    "acesso": "Download direto no servidor de dados do EMBRACE (readme v2.0 de 01/01/2026; mapas v1.0 de 2026-05-01).",
    "licenca": "Licença não declarada nos readmes. Exige agradecimento às redes (INCT/UNESP, EMBRACE/INPE/IBGE e NSSC/CAS) e aos financiadores (CNPq, FAPESP, CAPES).",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Tema que aparece em vários trabalhos do acervo do ITA (GNSS e cintilação em baixas latitudes). A página principal do programa não abriu (erro de certificado).",
    "confianca": "Parcial",
    "fonte": "https://embracedata.inpe.br/scintillation/readme_scintillation.html",
    "problemas": [
      "Navegação, GNSS e ionosfera",
      "Radiação e ambiente espacial e atmosférico"
    ],
    "tecnicas": [
      "Experimentação, ensaios e instrumentação"
    ],
    "temas": [
      "GNSS e ionosfera"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 12,
    "nome": "RBMC (IBGE): Rede Brasileira de Monitoramento Contínuo",
    "url": "https://www.ibge.gov.br/en/geosciences/geodetic-positioning/geodetic-networks/19213-brazilian-network-for-continuous-monitoring-of-the-gnss-systems.html",
    "conteudo": "Observações GNSS contínuas de estações brasileiras em RINEX 2 e 3 (15 s; multiconstelação desde 30/08/2018), com efemérides em diretório separado. Compactação Hatanaka (.crx) e gzip.",
    "gratuito": "Sim",
    "acesso": "FTP do IBGE (geoftp.ibge.gov.br) e portal web.",
    "licenca": "Gratuito segundo as fontes consultadas, sem licença formal declarada.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "Cerca de 150 estações (dado de 2019, pode estar desatualizado)",
    "citacao": "",
    "obs": "Informações vieram de resultados de busca, não de leitura direta da página do IBGE. Confirme os caminhos do FTP antes de automatizar.",
    "confianca": "Parcial",
    "fonte": "https://www.ibge.gov.br/en/geosciences/geodetic-positioning/geodetic-networks/19213-brazilian-network-for-continuous-monitoring-of-the-gnss-systems.html",
    "problemas": [
      "Navegação, GNSS e ionosfera"
    ],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [
      "GNSS e ionosfera",
      "Navegação, robótica e fusão sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 13,
    "nome": "IGS: dados e produtos GNSS (via CDDIS e files.igs.org)",
    "url": "https://igs.org/data/",
    "conteudo": "Observações GNSS diárias (RINEX 2 e 3, 30 s), horárias, de alta taxa, MGEX e em tempo real, mais órbitas e relógios precisos, quadro de referência, ionosfera, troposfera e vieses de código.",
    "gratuito": "Sim",
    "acesso": "Acesso aberto desde 1994 via arquivo do CDDIS e servidor HTTPS files.igs.org/pub. A página não menciona cadastro.",
    "licenca": "Regido pelo documento 'Data and Product Disclaimer and Terms of Use' do IGS (PDF não lido).",
    "classe": "Termos próprios ou acesso controlado",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Registro de usuário (Earthdata Login) pode ser exigido no CDDIS; a página do IGS não trata disso.",
    "confianca": "Parcial",
    "fonte": "https://igs.org/data/",
    "problemas": [
      "Navegação, GNSS e ionosfera"
    ],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores"
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
    "conteudo": "Medições GNSS brutas de smartphones Android (RINEX e logs do GnssLogger), dados de sensores e verdade terrestre de alta precisão. Edição de 2021: 73 conjuntos de treino e 48 de teste; edições 2023–2024 acrescentam mais de 150 trajetos.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Via Kaggle (conta) e página g.co/gnssTools.",
    "licenca": "Licença não confirmada nesta sessão. Veja as abas Data e Rules do Kaggle.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A regra do desafio permite dados externos desde que públicos e gratuitos para todos.",
    "confianca": "Parcial",
    "fonte": "https://www.ion.org/gnss/googlecompetition.cfm",
    "problemas": [
      "Navegação, GNSS e ionosfera"
    ],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [
      "GNSS e ionosfera",
      "Navegação, robótica e fusão sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 15,
    "nome": "EuRoC MAV (ETH Zurich)",
    "url": "https://projects.asl.ethz.ch/datasets/euroc-mav/",
    "conteudo": "Datasets visual-inerciais coletados a bordo de um micro-veículo aéreo: imagens estéreo, IMU sincronizada e verdade de movimento e estrutura.",
    "gratuito": "Não confirmado",
    "acesso": "Hospedado na ETH Research Collection (DOI 10.3929/ethz-b-000690084).",
    "licenca": "Não confirmada. Veja o campo de direitos do registro na ETH Research Collection.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Burri et al., The EuRoC micro aerial vehicle datasets, IJRR, 2016.",
    "obs": "Referência padrão para odometria visual-inercial e SLAM.",
    "confianca": "Parcial",
    "fonte": "https://projects.asl.ethz.ch/datasets/euroc-mav/",
    "problemas": [
      "VANTs, robôs e veículos autônomos",
      "Navegação, GNSS e ionosfera"
    ],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [
      "Navegação, robótica e fusão sensorial",
      "VANTs e sistemas aéreos autônomos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 16,
    "nome": "UZH-FPV Drone Racing",
    "url": "https://fpv.ifi.uzh.ch/",
    "conteudo": "Voos agressivos de drone de corrida: imagens e IMU de uma placa Snapdragon Flight, verdade terrestre de rastreador a laser Leica Nova MS60 e eventos de câmera mDAVIS 346. Mais de 27 sequências e mais de 10 km. Acréscimo de sequências 'SplitS' em dez/2023.",
    "gratuito": "Não confirmado",
    "acesso": "Página do projeto.",
    "licenca": "Não encontrei a licença nas fontes consultadas.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Delmerico et al., Are We Ready for Autonomous Drone Racing? The UZH-FPV Drone Racing Dataset, ICRA 2019.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://fpv.ifi.uzh.ch/",
    "problemas": [
      "VANTs, robôs e veículos autônomos"
    ],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [
      "VANTs e sistemas aéreos autônomos",
      "Navegação, robótica e fusão sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 17,
    "nome": "Mid-Air (Universidade de Liège)",
    "url": "https://midair.ulg.ac.be/",
    "conteudo": "Dataset sintético de voos de drone a muito baixa altitude: 79 minutos em 54 trajetórias de igual duração, com normais de superfície, profundidade, semântica de objetos e disparidade estéreo.",
    "gratuito": "Sim",
    "acesso": "Download público no site do dataset.",
    "licenca": "Não declarada nas fontes consultadas (a página institucional só traz aviso geral de direitos autorais).",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Fonder e Van Droogenbroeck, Mid-Air, CVPR Workshops 2019.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://openaccess.thecvf.com/content_CVPRW_2019/html/UAVision/Fonder_Mid-Air_A_Multi-Modal_Dataset_for_Extremely_Low_Altitude_Drone_Flights_CVPRW_2019_paper.html",
    "problemas": [
      "VANTs, robôs e veículos autônomos"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "VANTs e sistemas aéreos autônomos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 18,
    "nome": "TartanAir (CMU AirLab)",
    "url": "https://theairlab.org/tartanair-dataset/",
    "conteudo": "Dataset sintético de SLAM visual em ambientes simulados difíceis, com RGB, profundidade, segmentação e trajetórias, para testar limites de SLAM visual.",
    "gratuito": "Sim",
    "acesso": "Scripts de download no GitHub (castacks/tartanair_tools).",
    "licenca": "Não confirmada. Uma cópia no Azure Open Datasets cita licença MIT, mas parece se referir ao projeto, não às imagens.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Wang et al., TartanAir: A Dataset to Push the Limits of Visual SLAM, IROS 2020.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://ri.cmu.edu/publications/tartanair-a-dataset-to-push-the-limits-of-visual-slam",
    "problemas": [
      "VANTs, robôs e veículos autônomos"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [
      "Navegação, robótica e fusão sensorial",
      "VANTs e sistemas aéreos autônomos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 19,
    "nome": "VisDrone (Universidade de Tianjin)",
    "url": "https://github.com/VisDrone/VisDrone-Dataset",
    "conteudo": "Imagens e vídeos feitos por drones para detecção e rastreamento de objetos, maior conjunto do tipo à época do desafio. Copyright reservado à equipe AISKYEYE (Tianjin University).",
    "gratuito": "Sim",
    "acesso": "Repositório oficial do dataset.",
    "licenca": "Conflitante entre espelhos: alguns citam CC BY-NC-SA 3.0, outros cc-by-sa-3.0. O repositório oficial deve prevalecer.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Se o uso for comercial ou com parceiro industrial, confirme os termos no repositório oficial.",
    "confianca": "Parcial",
    "fonte": "https://arxiv.org/abs/2001.06303",
    "problemas": [
      "VANTs, robôs e veículos autônomos",
      "Defesa e guerra eletrônica"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecção",
      "VANTs e sistemas aéreos autônomos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 20,
    "nome": "KITTI Vision Benchmark Suite",
    "url": "https://www.cvlibs.net/datasets/kitti/",
    "conteudo": "Dados de condução autônoma (câmeras, LiDAR, GPS/IMU) e benchmarks de detecção, rastreamento, odometria e estéreo.",
    "gratuito": "Sim",
    "acesso": "Download no site (algumas partes exigem registro).",
    "licenca": "Creative Commons Atribuição-NãoComercial-CompartilhaIgual 3.0 (CC BY-NC-SA 3.0)",
    "classe": "Só pesquisa ou não comercial",
    "comercial": "Não",
    "tamanho": "",
    "citacao": "",
    "obs": "O site oficial declara a licença; AWS Open Data e outras fontes concordam. Não vale para fins comerciais.",
    "confianca": "Confirmado",
    "fonte": "https://www.cvlibs.net/datasets/kitti/",
    "problemas": [
      "VANTs, robôs e veículos autônomos",
      "Navegação, GNSS e ionosfera"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [
      "Navegação, robótica e fusão sensorial",
      "Aprendizado profundo para imagens e detecção"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 21,
    "nome": "nuScenes (Motional)",
    "url": "https://www.nuscenes.org/",
    "conteudo": "Dataset multimodal de condução autônoma (câmeras, LiDAR, radar) com anotações 3D.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Criar conta e aceitar os Termos de Uso na página de download.",
    "licenca": "Descrita como CC BY-NC-SA 4.0 com modificações nos Termos de Uso do nuScenes. Os termos oficiais valem.",
    "classe": "Só pesquisa ou não comercial",
    "comercial": "Não",
    "tamanho": "",
    "citacao": "",
    "obs": "Informação veio de fontes secundárias; o texto oficial de termos não foi lido.",
    "confianca": "Parcial",
    "fonte": "https://arxiv.org/pdf/1903.11027",
    "problemas": [
      "VANTs, robôs e veículos autônomos"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecção",
      "Navegação, robótica e fusão sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 22,
    "nome": "Waymo Open Dataset",
    "url": "https://waymo.com/open/",
    "conteudo": "Dados de condução autônoma da Waymo (sensores, anotações) para percepção e predição.",
    "gratuito": "Sim",
    "acesso": "Aceite do Waymo Dataset License Agreement for Non-Commercial Use (mar/2025) ao baixar ou usar.",
    "licenca": "Licença própria só para fins não comerciais, não exclusiva, pessoal e não transferível. Trabalhos derivados exigem a linha de crédito prevista.",
    "classe": "Só pesquisa ou não comercial",
    "comercial": "Não",
    "tamanho": "",
    "citacao": "",
    "obs": "Exclui trabalho voltado a litígio, licenciamento ou execução de direitos. Trechos pequenos podem ser publicados para ilustração. Há cláusulas sobre 'sistemas de produção' que não consegui ler por completo.",
    "confianca": "Confirmado",
    "fonte": "https://waymo.com/open/terms/",
    "problemas": [
      "VANTs, robôs e veículos autônomos"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Aprendizado profundo para imagens e detecção",
      "Navegação, robótica e fusão sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 23,
    "nome": "RoboCup Small Size League: logs de partidas",
    "url": "https://ssl.robocup.org/game-logs/",
    "conteudo": "Logs de partidas oficiais da liga, com mensagens ProtoBuf temporizadas do ssl-vision, do game-controller e de produtores de vision-tracker. Formato SSL_LOG_FILE v1 (timestamp em ns, tipo e payload).",
    "gratuito": "Sim",
    "acesso": "Logs públicos; locais de armazenamento listados na página 'Collected Data'. Ferramentas: ssl-go-tools (mantido) e ssl-logtools (legado).",
    "licenca": "Não declarada.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Não há um download consolidado único; links antigos de times podem estar mortos. O acervo do ITA tem trabalhos de futebol de robôs.",
    "confianca": "Parcial",
    "fonte": "https://ssl.robocup.org/game-logs/",
    "problemas": [
      "VANTs, robôs e veículos autônomos"
    ],
    "tecnicas": [
      "Aprendizado por reforço e agentes",
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [
      "Aprendizado por reforço e robótica inteligente",
      "Navegação, robótica e fusão sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 24,
    "nome": "NASA PCoE: C-MAPSS e Turbofan Degradation Simulation-2",
    "url": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "conteudo": "Degradação simulada de motores turbofan em vários modos de falha e condições de operação (C-MAPSS) e trajetórias run-to-failure de uma frota sob condições reais de voo (versão 2).",
    "gratuito": "Sim",
    "acesso": "Download direto na página (marcado 'Available'). O desafio PHM08 exige contato com a NASA.",
    "licenca": "Sem licença declarada. 'Users employ the data at their own risk'; pede-se agradecer ao repositório e aos doadores dos dados.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Referência para prognóstico de vida útil remanescente (RUL). Repositório espelhado em data.phmsociety.org/nasa/.",
    "confianca": "Confirmado",
    "fonte": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "problemas": [
      "Aeronaves, voo e tráfego aéreo"
    ],
    "tecnicas": [
      "Confiabilidade, risco e segurança de sistemas",
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [
      "Engenharia de sistemas e segurança (STPA)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 25,
    "nome": "NASA ASRS: Aviation Safety Reporting System",
    "url": "https://asrs.arc.nasa.gov/search/database.html",
    "conteudo": "Maior repositório de relatos voluntários e confidenciais de segurança da aviação (pilotos, controladores, mecânicos, comissários, despachantes): narrativas anonimizadas e campos codificados por analistas.",
    "gratuito": "Sim (a página não menciona custo)",
    "acesso": "Busca online; exporta para Word, Excel (.xls) ou CSV, no máximo 10.000 registros por download.",
    "licenca": "Termos formais não listados na página. Remete a 'Requesting ASRS Data'.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A NASA não verifica nem valida os relatos. Bom para mineração de texto e análise de fatores humanos. Cobertura temporal não informada na página.",
    "confianca": "Parcial",
    "fonte": "https://asrs.arc.nasa.gov/search/database.html",
    "problemas": [
      "Aeronaves, voo e tráfego aéreo"
    ],
    "tecnicas": [
      "Confiabilidade, risco e segurança de sistemas",
      "Conhecimento, mineração de dados e lógica nebulosa"
    ],
    "temas": [
      "Engenharia de sistemas e segurança (STPA)",
      "Radiação cósmica e aeronaves"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 26,
    "nome": "NTSB: banco de dados de aviação (acidentes e incidentes)",
    "url": "https://data.ntsb.gov/avdata",
    "conteudo": "Banco de acidentes e incidentes de aviação civil investigados pelo NTSB, distribuído em arquivos MDB.",
    "gratuito": "Não confirmado",
    "acesso": "A página consultada mostrou só o diretório 'MDB Download Directory'; o texto descritivo não foi legível.",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Descrição por conhecimento prévio; confirme período, formato e termos no site.",
    "confianca": "Não verificado",
    "fonte": "https://data.ntsb.gov/avdata",
    "problemas": [
      "Aeronaves, voo e tráfego aéreo"
    ],
    "tecnicas": [
      "Confiabilidade, risco e segurança de sistemas"
    ],
    "temas": [
      "Engenharia de sistemas e segurança (STPA)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 27,
    "nome": "OpenSky Network (ADS-B e Mode S)",
    "url": "https://opensky-network.org/data",
    "conteudo": "Dados históricos e em tempo real de ADS-B e Mode S coletados por rede de receptores, com vetores de estado de aeronaves.",
    "gratuito": "Não confirmado",
    "acesso": "O servidor devolveu HTTP 403 à consulta automática.",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Descrição por conhecimento prévio. Confirme as condições de uso para pesquisa acadêmica e para uso comercial.",
    "confianca": "Não verificado",
    "fonte": "https://opensky-network.org/data",
    "problemas": [
      "Aeronaves, voo e tráfego aéreo"
    ],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [
      "Engenharia de sistemas e segurança (STPA)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 28,
    "nome": "ANAC: dados abertos (voos, aeronaves, segurança operacional, drones)",
    "url": "https://www.gov.br/anac/pt-br/acesso-a-informacao/dados-abertos",
    "conteudo": "Mercado de transporte aéreo, histórico de voos, passageiros, aeronaves (RAB), aeroportos, pessoal da aviação civil, segurança operacional e painel de drones cadastrados. Há também a ferramenta ANAC DataSearch.",
    "gratuito": "Sim",
    "acesso": "Páginas temáticas e portal de dados abertos.",
    "licenca": "O site declara CC BY-ND 3.0 (Atribuição-SemDerivações) para seu conteúdo. Não confirma que valha para cada conjunto.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Formatos não listados na página. SemDerivações pode restringir redistribuição de versões modificadas; confira por conjunto.",
    "confianca": "Parcial",
    "fonte": "https://www.gov.br/anac/pt-br/assuntos/dados-e-estatisticas",
    "problemas": [
      "Aeronaves, voo e tráfego aéreo",
      "VANTs, robôs e veículos autônomos",
      "Transporte e logística"
    ],
    "tecnicas": [
      "Métodos de gestão e apoio à decisão"
    ],
    "temas": [
      "Engenharia de sistemas e segurança (STPA)",
      "VANTs e sistemas aéreos autônomos",
      "Gestão tecnológica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 29,
    "nome": "BTS TranStats (EUA): desempenho de voos e estatísticas de transporte",
    "url": "https://www.transtats.bts.gov/",
    "conteudo": "Atividade de companhias aéreas (passageiros, partidas, carga, fator de carga), atrasos de voos, tarifas médias, dados de aviação, rodoviário, ferroviário e marítimo.",
    "gratuito": "Sim (a página não menciona custo)",
    "acesso": "Buscador de dados e catálogo aberto em data.bts.gov.",
    "licenca": "A página não declara termos de reutilização (site .gov do Departamento de Transportes dos EUA; confira 'Web Policies and Notices').",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Dados do governo federal dos EUA costumam ser de domínio público, mas isso não foi lido na página.",
    "confianca": "Parcial",
    "fonte": "https://www.transtats.bts.gov/",
    "problemas": [
      "Aeronaves, voo e tráfego aéreo",
      "Transporte e logística"
    ],
    "tecnicas": [
      "Otimização e pesquisa operacional"
    ],
    "temas": [
      "Gestão tecnológica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 30,
    "nome": "UIUC Airfoil Coordinates Database",
    "url": "https://m-selig.ae.illinois.edu/ads/coord_database.html",
    "conteudo": "Mais de 1.600 aerofólios, de baixo número de Reynolds (VANTs, aeromodelos) a transportes a jato e turbinas eólicas, em coordenadas x,y. O site também lista dados de hélices.",
    "gratuito": "Sim (a página não menciona custo)",
    "acesso": "Navegação e download no site do grupo.",
    "licenca": "Sem termos declarados (aviso '© 1994–2026 UIUC Applied Aerodynamics Group').",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A página não descreve os dados de testes de túnel de vento de baixa velocidade.",
    "confianca": "Parcial",
    "fonte": "https://m-selig.ae.illinois.edu/ads.html",
    "problemas": [
      "Aeronaves, voo e tráfego aéreo",
      "VANTs, robôs e veículos autônomos"
    ],
    "tecnicas": [
      "Modelagem e simulação numérica (CFD, elementos finitos)",
      "Experimentação, ensaios e instrumentação"
    ],
    "temas": [
      "VANTs e sistemas aéreos autônomos"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 31,
    "nome": "NASA Turbulence Modeling Resource (TMR)",
    "url": "https://tmbwg.github.io/turbmodels/",
    "conteudo": "Modelos de turbulência e transição, casos de verificação e validação, dados experimentais e dados DNS/LES de referência para desenvolvedores de CFD.",
    "gratuito": "Sim",
    "acesso": "Site aberto. Endereço antigo (turbmodels.larc.nasa.gov) redireciona para o novo.",
    "licenca": "Sem termos declarados na página.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A página consultada não lista casos hipersônicos nem supersônicos. Confira o catálogo de casos.",
    "confianca": "Parcial",
    "fonte": "https://www.nasa.gov/nasa-turbulence-modeling-resource/",
    "problemas": [
      "Propulsão, foguetes e hipersônica",
      "Aeronaves, voo e tráfego aéreo"
    ],
    "tecnicas": [
      "Modelagem e simulação numérica (CFD, elementos finitos)"
    ],
    "temas": [
      "Hipersônica, escoamento e CFD"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 32,
    "nome": "Johns Hopkins Turbulence Databases (JHTDB)",
    "url": "https://turbulence.idies.jhu.edu/home",
    "conteudo": "Simulações numéricas diretas (DNS) e LES: turbulência isotrópica (100 TB), MHD (50 TB), escoamento em canal (130 TB), camada limite em transição (105 TB), camada limite estável (40 TB), estratificada, parques eólicos e snapshots até 32.768³ (cerca de meio petabyte).",
    "gratuito": "Não confirmado",
    "acesso": "Serviços web (REST, antigo SOAP), interfaces Python, Matlab, Fortran e C, recortes em HDF5 e ferramenta de consulta no navegador. Pode ser usado no SciServer.",
    "licenca": "Não declarada na página; seção 'Legal' não lida.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Token de autenticação e custo não aparecem na página consultada.",
    "confianca": "Parcial",
    "fonte": "https://turbulence.idies.jhu.edu/home",
    "problemas": [
      "Propulsão, foguetes e hipersônica",
      "Aeronaves, voo e tráfego aéreo"
    ],
    "tecnicas": [
      "Modelagem e simulação numérica (CFD, elementos finitos)",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Hipersônica, escoamento e CFD"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 33,
    "nome": "NIST Chemistry WebBook (SRD 69)",
    "url": "https://webbook.nist.gov/chemistry/",
    "conteudo": "Dados termoquímicos, termofísicos e de energética de íons, além de espectros UV/Vis, infravermelho (inclusive THz) e frequências vibracionais.",
    "gratuito": "Sim, hoje",
    "acesso": "Acesso web sem cadastro. O site diz que o NIST se reserva o direito de cobrar no futuro.",
    "licenca": "Direitos reservados (© Secretary of Commerce, EUA). Regido pelo Standard Reference Data Act. Citação via DOI 10.18434/T4D303.",
    "classe": "Termos próprios ou acesso controlado",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "É gratuito de fato, mas não é licença aberta. Útil para propriedades termodinâmicas de propelentes e produtos de combustão.",
    "confianca": "Confirmado",
    "fonte": "https://webbook.nist.gov/chemistry/",
    "problemas": [
      "Propulsão, foguetes e hipersônica",
      "Materiais e estruturas aeroespaciais"
    ],
    "tecnicas": [
      "Síntese e caracterização de materiais",
      "Modelagem e simulação numérica (CFD, elementos finitos)"
    ],
    "temas": [
      "Propulsão a propelente sólido",
      "Materiais avançados e polímeros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 34,
    "nome": "ThrustCurve.org: curvas de empuxo de motores-foguete",
    "url": "https://www.thrustcurve.org/",
    "conteudo": "Banco de motores-foguete de modelismo e amadores: especificações, curvas de empuxo, arquivos para simuladores. API REST gratuita (JSON ou XML).",
    "gratuito": "Sim (a página não menciona custo)",
    "acesso": "API aberta; salvar foguetes exige e-mail e senha.",
    "licenca": "Termos de uso e licença dos dados não declarados na página.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Motores de modelismo não representam propelentes sólidos de veículos lançadores. Útil para validar modelos de balística interna em escala pequena.",
    "confianca": "Parcial",
    "fonte": "https://www.thrustcurve.org/info/api.html",
    "problemas": [
      "Propulsão, foguetes e hipersônica"
    ],
    "tecnicas": [
      "Experimentação, ensaios e instrumentação"
    ],
    "temas": [
      "Propulsão a propelente sólido"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 35,
    "nome": "ESA Anomalies Dataset (ESA-ADB)",
    "url": "https://doi.org/10.5281/zenodo.12528696",
    "conteudo": "Telemetria real de três missões da ESA, com anomalias anotadas por engenheiros de operações e especialistas em aprendizado de máquina. Acompanha pipeline de avaliação e resultados de referência (ESA-ADB).",
    "gratuito": "Sim",
    "acesso": "Aberto no Zenodo, em três arquivos (ESA-Mission1/2/3.zip).",
    "licenca": "CC BY 3.0 IGO (dados, no registro Zenodo). Código do ESA-ADB sob MIT.",
    "classe": "Aberta",
    "comercial": "Sim, com atribuição",
    "tamanho": "11,6 GB (3,8 + 4,1 + 3,7 GB)",
    "citacao": "Kotowski et al., European Space Agency Dataset and Benchmark for Real-World Anomaly Detection in Spacecraft Time Series, DMLR, 2026.",
    "obs": "O README do GitHub não declara a licença dos dados; a do Zenodo foi lida no registro. Há versão mais nova no Zenodo.",
    "confianca": "Confirmado",
    "fonte": "https://zenodo.org/records/12528696",
    "problemas": [
      "Satélites e missões espaciais"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Confiabilidade, risco e segurança de sistemas"
    ],
    "temas": [
      "Engenharia de sistemas e segurança (STPA)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 36,
    "nome": "NASA SMAP e MSL: anomalias de telemetria",
    "url": "https://github.com/khundman/telemanom",
    "conteudo": "Telemetria e rótulos de anomalia do satélite SMAP e do rover Curiosity (MSL): 105 sequências de anomalia (69 SMAP, 36 MSL), 82 canais, 496.444 valores avaliados. Dados anonimizados no tempo e escalonados em (-1, 1).",
    "gratuito": "Sim, com cadastro",
    "acesso": "Download via Kaggle (exige chave de API).",
    "licenca": "Código sob Apache 2.0. A licença dos dados não é declarada.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Hundman et al., Detecting Spacecraft Anomalies Using LSTMs and Nonparametric Dynamic Thresholding, arXiv:1802.04431, 2018.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://github.com/khundman/telemanom",
    "problemas": [
      "Satélites e missões espaciais"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Confiabilidade, risco e segurança de sistemas"
    ],
    "temas": [
      "Engenharia de sistemas e segurança (STPA)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 37,
    "nome": "Space-Track.org (catálogo e elementos orbitais do governo dos EUA)",
    "url": "https://www.space-track.org/",
    "conteudo": "Catálogo de objetos espaciais (SATCAT), elementos orbitais GP em TLE/OMM/JSON/CSV, dados de decaimento e reentrada e mensagens de dados de conjunção (CDM).",
    "gratuito": "Sim, com cadastro",
    "acesso": "Conta gratuita e pessoal. Limites de API: menos de 30 requisições por minuto e 300 por hora; cada tipo de dado tem frequência máxima de coleta.",
    "licenca": "Contrato de usuário próprio. Redistribuição de dados básicos (TLE/OMM, SATCAT, decaimento) tem aprovação geral, desde que citada a fonte.",
    "classe": "Termos próprios ou acesso controlado",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "TLEs públicos não devem ser usados para avaliação de conjunção. Dados como RCS numérico exigem acordo ou pedido ao USSPACECOM.",
    "confianca": "Confirmado",
    "fonte": "https://www.space-track.org/documentation",
    "problemas": [
      "Satélites e missões espaciais"
    ],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 38,
    "nome": "CelesTrak (elementos orbitais, SATCAT, SOCRATES)",
    "url": "https://celestrak.org/",
    "conteudo": "Elementos GP/TLE atuais, catálogo SATCAT, relatórios de conjunção SOCRATES, dados GPS (NANUs, almanaques), parâmetros de orientação da Terra e clima espacial.",
    "gratuito": "Sim",
    "acesso": "Acesso aberto, sujeito à política de uso do site (não lida). Organização sem fins lucrativos que pede doações.",
    "licenca": "Política de uso própria, não lida.",
    "classe": "Termos próprios ou acesso controlado",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Desde 2026-07-11 acabaram os números de catálogo de 5 dígitos: objetos novos têm 6 dígitos e não existem em TLE. Use os formatos OMM, JSON ou CSV.",
    "confianca": "Parcial",
    "fonte": "https://celestrak.org/",
    "problemas": [
      "Satélites e missões espaciais",
      "Navegação, GNSS e ionosfera"
    ],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores"
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
    "conteudo": "Sinais de rádio sintéticos com efeitos de canal para classificação automática de modulação. A versão 2018.01A tem 24 modulações, 2 milhões de exemplos de 1024 amostras I/Q (HDF5). As de 2016 têm 11 modulações.",
    "gratuito": "Sim",
    "acesso": "Download direto (opendata.deepsig.io).",
    "licenca": "Creative Commons CC BY-NC-SA 4.0 (todos os conjuntos). Para outra licença, contatar a DeepSig.",
    "classe": "Só pesquisa ou não comercial",
    "comercial": "Não, sob esta licença",
    "tamanho": "",
    "citacao": "",
    "obs": "A própria DeepSig diz que os dados são de 2016/2017, têm erratas conhecidas, não os mantém e não os recomenda para produtos. Prefira dados reais ou gerar os seus.",
    "confianca": "Confirmado",
    "fonte": "https://www.deepsig.ai/datasets/",
    "problemas": [
      "Comunicações sem fio e transmissão",
      "Defesa e guerra eletrônica"
    ],
    "tecnicas": [
      "Comunicações digitais (modulação, codificação, canal)",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes e protocolos de comunicação",
      "Aprendizado profundo para imagens e detecção"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 40,
    "nome": "CRAWDAD (IEEE DataPort): traços de redes sem fio",
    "url": "https://ieee-dataport.org/collections/crawdad",
    "conteudo": "Arquivo de dados de redes sem fio reais e usuários móveis, fundado em 2004 por Kotz e Henderson. Os conjuntos agora ficam na coleção CRAWDAD do IEEE DataPort.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Conta gratuita no IEEE DataPort. A página diz que todos os conjuntos serão Open Access após aprovação.",
    "licenca": "Não declarada na página; pode variar por conjunto.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A página não informa o número de conjuntos nem um modelo de citação.",
    "confianca": "Parcial",
    "fonte": "https://crawdad.org/",
    "problemas": [
      "Comunicações sem fio e transmissão",
      "Redes de computadores e internet"
    ],
    "tecnicas": [
      "Redes, protocolos e segurança da informação"
    ],
    "temas": [
      "Redes e protocolos de comunicação"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 41,
    "nome": "DeepMIMO",
    "url": "https://www.deepmimo.net/",
    "conteudo": "Datasets de canais MIMO gerados por traçado de raios em cenários de ambientes urbanos e internos (descrição por conhecimento prévio).",
    "gratuito": "Não confirmado",
    "acesso": "A página consultada só mostrou o título.",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Confirme cenários, licença e citação no site.",
    "confianca": "Não verificado",
    "fonte": "https://www.deepmimo.net/",
    "problemas": [
      "Comunicações sem fio e transmissão"
    ],
    "tecnicas": [
      "Comunicações digitais (modulação, codificação, canal)",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes e protocolos de comunicação"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 42,
    "nome": "Anatel: dados abertos (telefonia, banda larga, ERBs, espectro)",
    "url": "https://dados.gov.br/dados/organizacoes/visualizar/agencia-nacional-de-telecomunicacoes",
    "conteudo": "Conjuntos publicados pela Anatel no Portal Brasileiro de Dados Abertos (descrição por conhecimento prévio).",
    "gratuito": "Não confirmado",
    "acesso": "A página consultada só mostrou o título 'Portal de Dados Abertos'.",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Confira no portal quais conjuntos existem, formatos e a licença de cada um.",
    "confianca": "Não verificado",
    "fonte": "https://dados.gov.br/",
    "problemas": [
      "Comunicações sem fio e transmissão"
    ],
    "tecnicas": [],
    "temas": [
      "Redes e protocolos de comunicação",
      "Gestão tecnológica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 43,
    "nome": "CAIDA: topologia, DNS e telescópio de rede",
    "url": "https://www.caida.org/catalog/datasets/overview/",
    "conteudo": "Topologia (traceroutes do Ark IPv4/IPv6, ITDK, AS Rank, AS Relationships, AS2Org, PeeringDB Archive, mapeamentos de prefixo), geolocalização, infraestrutura, DNS e telescópio de rede da UCSD (fluxos agregados, ataques RSDoS).",
    "gratuito": "Sim, parcialmente sob solicitação",
    "acesso": "Parte pública (AS Rank, AS Relationships, AS2Org e outros). Parte restrita por formulário de pedido (ITDK, Ark DNS, todos os conjuntos de telescópio; dados em tempo real ficam 14 dias, histórico desde 2008 sob pedido).",
    "licenca": "Acordo de Uso Aceitável (AUA) do CAIDA. Quem publica deve avisar o CAIDA.",
    "classe": "Termos próprios ou acesso controlado",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Textos do AUA e das FAQs de uso não foram lidos.",
    "confianca": "Confirmado",
    "fonte": "https://www.caida.org/catalog/datasets/overview/",
    "problemas": [
      "Redes de computadores e internet",
      "Segurança cibernética"
    ],
    "tecnicas": [
      "Redes, protocolos e segurança da informação"
    ],
    "temas": [
      "Redes e protocolos de comunicação"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 44,
    "nome": "MAWI Working Group Traffic Archive (WIDE)",
    "url": "http://mawi.wide.ad.jp/mawi/",
    "conteudo": "Traços de pacotes (tcpdump) do backbone WIDE, com IPs embaralhados. Principal ponto de captura (samplepoint-F) de 2006 a 2026; pontos mais antigos de 1999 a 2009 e 2018–2020. O MAWILab (rótulos de anomalia) foi encerrado em dez/2024.",
    "gratuito": "Sim (a página não menciona custo)",
    "acesso": "Download público.",
    "licenca": "Uso permitido apenas para pesquisa. Proíbe violar a privacidade dos usuários.",
    "classe": "Só pesquisa ou não comercial",
    "comercial": "Não",
    "tamanho": "",
    "citacao": "",
    "obs": "Faltam dados de 4/nov a 15/dez de 2022. Traços de 28/mai a 3/set de 2015 têm pacotes duplicados.",
    "confianca": "Confirmado",
    "fonte": "http://mawi.wide.ad.jp/mawi/",
    "problemas": [
      "Redes de computadores e internet",
      "Segurança cibernética"
    ],
    "tecnicas": [
      "Redes, protocolos e segurança da informação"
    ],
    "temas": [
      "Redes e protocolos de comunicação"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 45,
    "nome": "M-Lab (Measurement Lab)",
    "url": "https://www.measurementlab.net/data/",
    "conteudo": "Saídas brutas de testes de rede: NDT (desempenho TCP), traceroute, Reverse Traceroute, Neubot DASH, WeHe, MSAK e IPRS, além de cabeçalhos de pacotes e TCP INFO.",
    "gratuito": "Sim",
    "acesso": "Arquivos no Google Cloud Storage e BigQuery para parte dos testes. Atraso mínimo de 24 h.",
    "licenca": "CC0 (domínio público) para os dados. O conteúdo do site é CC BY-NC-SA 4.0.",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "",
    "citacao": "The M-Lab <nome do teste> Data Set, <período usado>. <URL do teste>.",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://www.measurementlab.net/data/",
    "problemas": [
      "Redes de computadores e internet"
    ],
    "tecnicas": [
      "Redes, protocolos e segurança da informação"
    ],
    "temas": [
      "Redes e protocolos de comunicação"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 46,
    "nome": "CIC-IDS2017 (Univ. de New Brunswick)",
    "url": "https://www.unb.ca/cic/datasets/ids-2017.html",
    "conteudo": "Tráfego benigno e ataques de cinco dias de julho de 2017: força bruta FTP/SSH, DoS, Heartbleed, ataques web, infiltração, botnet, DDoS e port scan. PCAP e fluxos rotulados em CSV com mais de 80 atributos (CICFlowMeter).",
    "gratuito": "Sim",
    "acesso": "Página de download do CIC (cicresearch.ca).",
    "licenca": "Disponível a pesquisadores. A página não nomeia licença nem termos.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "Seg. 11 GB, ter. 11 GB, qua. 13 GB, qui. 7,8 GB, sex. 8,3 GB",
    "citacao": "Sharafaldin, Habibi Lashkari e Ghorbani, Toward Generating a New Intrusion Detection Dataset and Intrusion Traffic Characterization, ICISSP 2018.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://www.unb.ca/cic/datasets/ids-2017.html",
    "problemas": [
      "Segurança cibernética",
      "Redes de computadores e internet"
    ],
    "tecnicas": [
      "Redes, protocolos e segurança da informação",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes e protocolos de comunicação",
      "Redes neurais artificiais (clássicas)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 47,
    "nome": "UNSW-NB15",
    "url": "https://research.unsw.edu.au/projects/unsw-nb15-dataset",
    "conteudo": "2.540.044 registros em quatro CSVs, nove categorias de ataque (Fuzzers, Analysis, Backdoors, DoS, Exploits, Generic, Reconnaissance, Shellcode, Worms), 49 atributos, divisão treino/teste (175.341 e 82.332) e cerca de 100 GB de capturas brutas (pcap, BRO, Argus).",
    "gratuito": "Sim",
    "acesso": "Pasta SharePoint da UNSW linkada na página.",
    "licenca": "Uso livre para pesquisa acadêmica, em caráter perpétuo. Uso comercial deve ser acordado com os autores.",
    "classe": "Só pesquisa ou não comercial",
    "comercial": "Sob acordo com os autores",
    "tamanho": "",
    "citacao": "Moustafa e Slay (2015, 2016), Moustafa et al. (2017) e Sarhan et al. (2020), como listado na página.",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://research.unsw.edu.au/projects/unsw-nb15-dataset",
    "problemas": [
      "Segurança cibernética",
      "Redes de computadores e internet"
    ],
    "tecnicas": [
      "Redes, protocolos e segurança da informação",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes e protocolos de comunicação",
      "Redes neurais artificiais (clássicas)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 48,
    "nome": "TON_IoT (UNSW Canberra)",
    "url": "https://research.unsw.edu.au/projects/toniot-datasets",
    "conteudo": "Telemetria de IoT/IIoT (mais de 10 sensores), desempenho de Windows 7/10 e Ubuntu 14/18, tráfego de rede (PCAP, Zeek, TLS) e ataques (DoS, DDoS, ransomware) rotulados.",
    "gratuito": "Sim",
    "acesso": "SharePoint linkado na página.",
    "licenca": "Uso livre para pesquisa acadêmica, em caráter perpétuo. Uso comercial só após consultar o autor.",
    "classe": "Só pesquisa ou não comercial",
    "comercial": "Sob consulta ao autor",
    "tamanho": "",
    "citacao": "É preciso citar os oito artigos listados na página.",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://research.unsw.edu.au/projects/toniot-datasets",
    "problemas": [
      "Segurança cibernética",
      "Redes de computadores e internet"
    ],
    "tecnicas": [
      "Redes, protocolos e segurança da informação",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes e protocolos de comunicação"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 49,
    "nome": "CTU-13 (botnets)",
    "url": "https://www.stratosphereips.org/datasets-ctu13",
    "conteudo": "13 capturas rotuladas de tráfego de botnet, normal e de fundo (CTU, 2011). Cada cenário tem pcap só do botnet, NetFlow bidirecional rotulado e o executável do malware.",
    "gratuito": "Sim",
    "acesso": "Download público no site (1,9 GB, ou por cenário). Cópia de segurança no Mega.",
    "licenca": "Não declarada.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "1,9 GB (.tar.bz2)",
    "citacao": "Garcia, Grill, Stiborek e Zunino, An empirical comparison of botnet detection methods, Computers and Security, 45, 2014.",
    "obs": "Use os NetFlows bidirecionais; a página diz que os unidirecionais antigos não devem ser usados. O pcap completo não é publicado, por privacidade.",
    "confianca": "Parcial",
    "fonte": "https://www.stratosphereips.org/datasets-ctu13",
    "problemas": [
      "Segurança cibernética"
    ],
    "tecnicas": [
      "Redes, protocolos e segurança da informação"
    ],
    "temas": [
      "Redes e protocolos de comunicação"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 50,
    "nome": "Defects4J",
    "url": "https://github.com/rjust/defects4j",
    "conteudo": "854 bugs reais e reproduzíveis (mais 10 obsoletos) de 17 projetos Java de código aberto, cada um com o teste que falha antes da correção e passa depois, mais infraestrutura para experimentos controlados.",
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
      "Software e sistemas de informação"
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
    "conteudo": "Dados anonimizados de estudantes, módulos, interações no ambiente virtual e avaliações da Open University (descrição por conhecimento prévio; a página consultada só traz a citação).",
    "gratuito": "Não confirmado",
    "acesso": "A página redireciona para uma seção 'Open dataset' que não foi lida.",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Kuzilek, Hlosta e Zdrahal, Open University Learning Analytics dataset, Scientific Data 4:170171, 2017.",
    "obs": "Confirme licença e conteúdo antes de usar.",
    "confianca": "Não verificado",
    "fonte": "https://research.stem.open.ac.uk/ouanalyse/",
    "problemas": [
      "Software e sistemas de informação"
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
    "id": 52,
    "nome": "DroneRF (Universidade do Catar)",
    "url": "https://data.mendeley.com/datasets/f4c2b4n755/1",
    "conteudo": "Gravações de radiofrequência de três drones em vários modos (desligado, ligado e conectado, pairando, voando, gravando vídeo): 227 segmentos, mais gravações de fundo sem drones. Para detecção, identificação e rastreamento de drones.",
    "gratuito": "Sim",
    "acesso": "Download no Mendeley Data (DOI 10.17632/f4c2b4n755.1).",
    "licenca": "CC BY 4.0",
    "classe": "Aberta",
    "comercial": "Sim, com atribuição",
    "tamanho": "",
    "citacao": "Al-Sa'd et al., DroneRF dataset, Mendeley Data, v1, 2019.",
    "obs": "Cada segmento vem em duas partes que precisam ser carregadas juntas.",
    "confianca": "Confirmado",
    "fonte": "https://data.mendeley.com/datasets/f4c2b4n755/1",
    "problemas": [
      "Defesa e guerra eletrônica",
      "VANTs, robôs e veículos autônomos",
      "Comunicações sem fio e transmissão"
    ],
    "tecnicas": [
      "Processamento de sinais e imagens",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "VANTs e sistemas aéreos autônomos",
      "Aprendizado profundo para imagens e detecção"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 53,
    "nome": "SIPRI: bases de gastos militares, transferência de armas e indústria",
    "url": "https://www.sipri.org/databases",
    "conteudo": "Quatro bases: Arms Industry (100 maiores produtoras), Arms Transfers (desde 1950), Military Expenditure (desde 1949, moeda local, dólar constante e % do PIB) e Multilateral Peace Operations (desde 2000).",
    "gratuito": "Não confirmado",
    "acesso": "Consulta no site. Termos em /databases/terms (não lidos).",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Útil para análise de gestão e política de defesa. Verifique os termos antes de redistribuir.",
    "confianca": "Parcial",
    "fonte": "https://www.sipri.org/databases",
    "problemas": [
      "Defesa e guerra eletrônica",
      "Gestão, inovação e políticas"
    ],
    "tecnicas": [
      "Métodos de gestão e apoio à decisão"
    ],
    "temas": [
      "Gestão tecnológica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 54,
    "nome": "OpenAlex",
    "url": "https://openalex.org/",
    "conteudo": "Índice aberto da produção científica mundial: obras, autores, instituições, tópicos e citações. Útil para mapear linhas de pesquisa e redes de coautoria do ITA.",
    "gratuito": "Não confirmado",
    "acesso": "API e snapshot. A página de ajuda consultada é só um índice; preço, créditos de API e chave não estavam nela.",
    "licenca": "Não confirmada nesta sessão. (Conhecimento prévio: dados em CC0. Confirmar.)",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Complementa bem o nosso acervo do BDITA com publicações em periódicos e conferências.",
    "confianca": "Não verificado",
    "fonte": "https://help.openalex.org/",
    "problemas": [
      "Gestão, inovação e políticas"
    ],
    "tecnicas": [
      "Métodos de gestão e apoio à decisão",
      "Conhecimento, mineração de dados e lógica nebulosa"
    ],
    "temas": [
      "Gestão tecnológica e defesa",
      "Mineração de dados e sistemas de conhecimento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 55,
    "nome": "CAPES Dados Abertos (teses, dissertações e pós-graduação)",
    "url": "https://dadosabertos.capes.gov.br/",
    "conteudo": "Dados abertos da CAPES, entre eles o Catálogo de Teses e Dissertações e informações da pós-graduação (descrição por conhecimento prévio).",
    "gratuito": "Não confirmado",
    "acesso": "O portal não respondeu nesta sessão (tempo esgotado e HTTP 403).",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Diretamente útil ao nosso projeto: permite cruzar os trabalhos do ITA com o conjunto nacional de teses.",
    "confianca": "Não verificado",
    "fonte": "https://dadosabertos.capes.gov.br/",
    "problemas": [
      "Gestão, inovação e políticas"
    ],
    "tecnicas": [
      "Métodos de gestão e apoio à decisão"
    ],
    "temas": [
      "Gestão tecnológica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 56,
    "nome": "BDTD (IBICT): Biblioteca Digital Brasileira de Teses e Dissertações",
    "url": "https://bdtd.ibict.br/",
    "conteudo": "Agregador nacional de teses e dissertações de instituições brasileiras (descrição por conhecimento prévio).",
    "gratuito": "Não confirmado",
    "acesso": "A página consultada só mostrou o título 'BDTD'.",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Confirme se há coleta por OAI-PMH e quais são os termos.",
    "confianca": "Não verificado",
    "fonte": "https://bdtd.ibict.br/",
    "problemas": [
      "Gestão, inovação e políticas"
    ],
    "tecnicas": [
      "Métodos de gestão e apoio à decisão"
    ],
    "temas": [
      "Gestão tecnológica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 57,
    "nome": "INPI: dados abertos (patentes, marcas, desenhos industriais)",
    "url": "https://dadosabertos.inpi.gov.br/",
    "conteudo": "Dados abertos do Instituto Nacional da Propriedade Industrial, publicados em portal próprio e no Portal Brasileiro de Dados Abertos. Há conjuntos programados para abertura.",
    "gratuito": "Sim (a página não menciona custo)",
    "acesso": "Portal dadosabertos.inpi.gov.br. A página consultada não lista conjuntos nem formatos.",
    "licenca": "O site gov.br declara CC BY-ND 3.0 para seu conteúdo. Não confirma que valha para cada conjunto.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Útil para análise de inovação (patentes depositadas por instituições de defesa e aeroespacial).",
    "confianca": "Parcial",
    "fonte": "https://www.gov.br/inpi/pt-br/acesso-a-informacao/dados-abertos",
    "problemas": [
      "Gestão, inovação e políticas"
    ],
    "tecnicas": [
      "Métodos de gestão e apoio à decisão"
    ],
    "temas": [
      "Gestão tecnológica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 58,
    "nome": "PatentsView (patentes dos EUA)",
    "url": "https://data.uspto.gov/support/transition-guide/patentsview",
    "conteudo": "Dados de patentes dos EUA (patentes, inventores, titulares, citações). O serviço migrou para o portal de dados do USPTO.",
    "gratuito": "Não confirmado",
    "acesso": "O endereço antigo redireciona para o guia de transição do USPTO; o conteúdo consultado veio vazio.",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Confirme o novo local de download e a licença no portal do USPTO.",
    "confianca": "Não verificado",
    "fonte": "https://data.uspto.gov/support/transition-guide/patentsview",
    "problemas": [
      "Gestão, inovação e políticas"
    ],
    "tecnicas": [
      "Métodos de gestão e apoio à decisão"
    ],
    "temas": [
      "Gestão tecnológica e defesa"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 59,
    "nome": "NASA PCoE: fadiga de compósitos CFRP e crescimento de trinca em alumínio",
    "url": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "conteudo": "Fadiga até a falha de painéis de fibra de carbono (CFRP), com ondas de Lamb, deformação e raios X; e crescimento de trinca em junta sobreposta de alumínio, com sinais de ondas de Lamb e medidas ópticas de comprimento de trinca.",
    "gratuito": "Parcial",
    "acesso": "Compósitos CFRP: download direto. Trinca em alumínio: 'Contact NASA' (e-mail na página).",
    "licenca": "Sem licença declarada; uso por conta e risco, com agradecimento ao repositório.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "problemas": [
      "Materiais e estruturas aeroespaciais",
      "Aeronaves, voo e tráfego aéreo"
    ],
    "tecnicas": [
      "Síntese e caracterização de materiais",
      "Confiabilidade, risco e segurança de sistemas"
    ],
    "temas": [
      "Materiais avançados e polímeros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 60,
    "nome": "JARVIS (NIST)",
    "url": "https://jarvis.nist.gov/",
    "conteudo": "JARVIS-DFT (mais de 80.000 materiais), JARVIS-QETB (mais de 800.000), campos de força clássicos, aprendizado de máquina (ALIGNN), bases de supercondutores e interfaces e um leaderboard com mais de 300 benchmarks. Mais de 1,5 milhão de pontos de dados no Figshare.",
    "gratuito": "Sim, com cadastro",
    "acesso": "Login gratuito para os aplicativos web; API OPTIMADE; downloads no Figshare; código no GitHub (usnistgov).",
    "licenca": "Não declarada na página; link 'Terms of use' não lido.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Choudhary et al., npj Computational Materials 6, 173 (2020), doi:10.1038/s41524-020-00440-1.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://jarvis.nist.gov/",
    "problemas": [
      "Materiais e estruturas aeroespaciais"
    ],
    "tecnicas": [
      "Síntese e caracterização de materiais",
      "Redes neurais e aprendizado profundo",
      "Modelagem e simulação numérica (CFD, elementos finitos)"
    ],
    "temas": [
      "Materiais avançados e polímeros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 61,
    "nome": "Materials Project",
    "url": "https://next-gen.materialsproject.org/",
    "conteudo": "Propriedades de materiais calculadas por DFT (descrição por conhecimento prévio).",
    "gratuito": "Não confirmado",
    "acesso": "O servidor devolveu HTTP 403 à consulta automática.",
    "licenca": "Não confirmada nesta sessão. (Conhecimento prévio: CC BY 4.0 e chave de API. Confirmar.)",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Não verificado",
    "fonte": "https://next-gen.materialsproject.org/about",
    "problemas": [
      "Materiais e estruturas aeroespaciais"
    ],
    "tecnicas": [
      "Síntese e caracterização de materiais"
    ],
    "temas": [
      "Materiais avançados e polímeros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 62,
    "nome": "OQMD: Open Quantum Materials Database",
    "url": "https://oqmd.org/",
    "conteudo": "Propriedades termodinâmicas e estruturais calculadas por DFT (descrição por conhecimento prévio).",
    "gratuito": "Não confirmado",
    "acesso": "O servidor devolveu HTTP 502 à consulta automática.",
    "licenca": "Não confirmada nesta sessão.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Não verificado",
    "fonte": "https://oqmd.org/",
    "problemas": [
      "Materiais e estruturas aeroespaciais"
    ],
    "tecnicas": [
      "Síntese e caracterização de materiais"
    ],
    "temas": [
      "Materiais avançados e polímeros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 63,
    "nome": "RefractiveIndex.INFO",
    "url": "https://refractiveindex.info/",
    "conteudo": "Constantes ópticas (n, k) de materiais em arquivos YAML, inclusive índice de refração não linear (n2), com calculadoras de absorção, reflexão de Fresnel e ângulo de Brewster.",
    "gratuito": "Sim",
    "acesso": "Download da versão em zip (rii-database-2026-05-24.zip) ou repositório polyanskiy/refractiveindex.info-database no GitHub.",
    "licenca": "CC0 1.0 (domínio público). Uso livre, inclusive comercial, sem necessidade de permissão.",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "",
    "citacao": "Polyanskiy, Sci. Data 11, 94 (2024), doi:10.1038/s41597-023-02898-2.",
    "obs": "Sem garantia de acurácia ('use at your own risk').",
    "confianca": "Confirmado",
    "fonte": "https://refractiveindex.info/about",
    "problemas": [
      "Antenas, RF e comunicações ópticas",
      "Materiais e estruturas aeroespaciais"
    ],
    "tecnicas": [
      "Eletromagnetismo, RF e fotônica",
      "Síntese e caracterização de materiais"
    ],
    "temas": [
      "Fotônica e enlaces ópticos",
      "Materiais avançados e polímeros"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 64,
    "nome": "NASA PCoE: baterias de íon-lítio",
    "url": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "conteudo": "Ciclos de carga e descarga de íon-lítio em várias temperaturas com impedância; uso aleatório de corrente com ciclos de referência (sete partes); teste acelerado de vida de pacotes 18650 e segunda vida; simulação de potência de bateria de pequeno satélite; baterias do avião Edge 540 em câmara HIRF.",
    "gratuito": "Parcial",
    "acesso": "Baterias Li-ion e uso aleatório: download direto. Teste acelerado e simulação de satélite: contato com a NASA. HIRF: referência marcada como fora do ar.",
    "licenca": "Sem licença declarada; uso por conta e risco, com agradecimento ao repositório.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Direto para estimação de estado de carga (SOC) e prognóstico de vida útil.",
    "confianca": "Confirmado",
    "fonte": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "problemas": [
      "Energia, baterias e eletroquímica",
      "Satélites e missões espaciais"
    ],
    "tecnicas": [
      "Confiabilidade, risco e segurança de sistemas",
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 65,
    "nome": "CALCE Battery Data (Univ. de Maryland)",
    "url": "https://calce.umd.edu/battery-data",
    "conteudo": "Células cilíndricas (INR 18650-20R; A123), prismáticas (CS2, CX2) e pouch (PL), químicas LCO, LFP e NMC. Testes OCV (C/20 e incremental), perfis dinâmicos (DST, FUDS, US06, BJDST) de -10 a 50 °C, ciclagem de vários tipos, SOC parcial e armazenamento de 144 células.",
    "gratuito": "Sim",
    "acesso": "Downloads em ZIP por célula e teste.",
    "licenca": "Sem licença declarada. A página descreve 'open access' e pede citar os artigos CALCE de cada conjunto.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Contato: Prof. Michael Pecht. Volume total não informado.",
    "confianca": "Parcial",
    "fonte": "https://calce.umd.edu/battery-data",
    "problemas": [
      "Energia, baterias e eletroquímica"
    ],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores",
      "Experimentação, ensaios e instrumentação"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 66,
    "nome": "Battery Archive",
    "url": "https://batteryarchive.org/",
    "conteudo": "Dados de ciclagem e testes disruptivos de baterias de várias instituições, com ferramentas de visualização, filtro por condições de teste e modelos de degradação. Apoio do DOE (Sandia).",
    "gratuito": "Parcial",
    "acesso": "Visualização no site. Os CSVs completos são enviados mediante e-mail para info@batteryarchive.org.",
    "licenca": "Não declarada.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://batteryarchive.org/",
    "problemas": [
      "Energia, baterias e eletroquímica"
    ],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 67,
    "nome": "NMDB: Neutron Monitor Database",
    "url": "https://www.nmdb.eu/",
    "conteudo": "Medidas de monitores de nêutrons de estações do mundo todo, em tempo real e histórico (raios cósmicos secundários).",
    "gratuito": "Sim",
    "acesso": "Interface web simples.",
    "licenca": "Gratuito para uso não comercial, dentro das restrições impostas pelos provedores. A propriedade fica com cada provedor.",
    "classe": "Só pesquisa ou não comercial",
    "comercial": "Não",
    "tamanho": "",
    "citacao": "",
    "obs": "Exige agradecer ao NMDB (programa EU FP7, contrato 213007) e a cada monitor usado. Dados de outras origens podem não ter sido validados pelo responsável da estação. Diretamente ligado aos trabalhos do acervo sobre radiação cósmica a bordo de aeronaves.",
    "confianca": "Confirmado",
    "fonte": "https://www.nmdb.eu/",
    "problemas": [
      "Radiação e ambiente espacial e atmosférico",
      "Aeronaves, voo e tráfego aéreo"
    ],
    "tecnicas": [
      "Experimentação, ensaios e instrumentação"
    ],
    "temas": [
      "Radiação cósmica e aeronaves"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 68,
    "nome": "NOAA SWPC: clima espacial (vento solar, Kp, GOES raios-X e prótons)",
    "url": "https://www.swpc.noaa.gov/products-and-data",
    "conteudo": "Observações de vento solar (inclusive ACE em tempo real), índice Kp planetário, índices K e A de estações, fluxo de raios-X e de prótons do GOES, gráficos de atividade geomagnética e arquivos hospedados no NCEI.",
    "gratuito": "Sim",
    "acesso": "Produtos e arquivos online (dados históricos no NCEI).",
    "licenca": "A página não traz política de dados; só links de aviso e privacidade.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://www.spaceweather.gov/products-and-data",
    "problemas": [
      "Radiação e ambiente espacial e atmosférico",
      "Navegação, GNSS e ionosfera"
    ],
    "tecnicas": [
      "Experimentação, ensaios e instrumentação"
    ],
    "temas": [
      "Radiação cósmica e aeronaves",
      "GNSS e ionosfera"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 69,
    "nome": "NASA OMNIWeb Plus (SPDF)",
    "url": "https://omniweb.gsfc.nasa.gov/",
    "conteudo": "Dados de campo magnético, plasma e partículas energéticas relevantes à heliosfera, com fluxos de partículas energéticas, cruzamentos de magnetopausa e de bow shock e acesso por FTP.",
    "gratuito": "Não confirmado",
    "acesso": "Navegação web e FTP; custo e política de uso não aparecem na página.",
    "licenca": "Não declarada; a página aponta para páginas de DOI e agradecimentos não lidas.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://omniweb.gsfc.nasa.gov/",
    "problemas": [
      "Radiação e ambiente espacial e atmosférico"
    ],
    "tecnicas": [
      "Experimentação, ensaios e instrumentação"
    ],
    "temas": [
      "Radiação cósmica e aeronaves"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 70,
    "nome": "MIT-BIH Arrhythmia Database (PhysioNet)",
    "url": "https://physionet.org/content/mitdb/1.0.0/",
    "conteudo": "48 registros de ECG ambulatorial de cerca de 30 min, 47 sujeitos (1975–1979), 360 amostras/s por canal, cerca de 110.000 anotações de batimento feitas por dois ou mais cardiologistas.",
    "gratuito": "Sim",
    "acesso": "Download aberto no PhysioNet.",
    "licenca": "Open Data Commons Attribution License v1.0",
    "classe": "Aberta",
    "comercial": "Sim, com atribuição",
    "tamanho": "~104,3 MB descomprimido (73,5 MB em ZIP)",
    "citacao": "Moody e Mark, IEEE Eng. Med. Biol. 20(3):45–50, 2001; DOI do dataset 10.13026/C2F305.",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://physionet.org/content/mitdb/1.0.0/",
    "problemas": [
      "Saúde e aplicações biomédicas"
    ],
    "tecnicas": [
      "Processamento de sinais e imagens",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes neurais artificiais (clássicas)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 71,
    "nome": "MIMIC-IV (PhysioNet)",
    "url": "https://physionet.org/content/mimiciv/",
    "conteudo": "Prontuários eletrônicos desidentificados do Beth Israel Deaconess (pronto-socorro e UTI): 364.627 pessoas, 546.028 internações e 94.458 estadias em UTI (v3.0). Módulos hosp e icu, ligáveis a MIMIC-IV-Note, -ED e -CXR.",
    "gratuito": "Sim, com credenciamento",
    "acesso": "Exige usuário credenciado do PhysioNet, treinamento CITI 'Data or Specimens Only Research' e assinatura do acordo de uso.",
    "licenca": "PhysioNet Credentialed Health Data License 1.5.0 e Data Use Agreement 1.5.0",
    "classe": "Termos próprios ou acesso controlado",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Johnson et al., MIMIC-IV (v3.1), PhysioNet, doi:10.13026/kpb9-mt58.",
    "obs": "Dados de pacientes: cuidado com privacidade e termos de redistribuição.",
    "confianca": "Confirmado",
    "fonte": "https://physionet.org/content/mimiciv/",
    "problemas": [
      "Saúde e aplicações biomédicas"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Conhecimento, mineração de dados e lógica nebulosa"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 72,
    "nome": "Portal de Dados Abertos da Saúde (Brasil)",
    "url": "https://dadosabertos.saude.gov.br/",
    "conteudo": "Catálogo com 19 conjuntos em temas como arboviroses, assistência à saúde, farmacêutica, atenção primária, ciência e tecnologia e diagnósticos e tratamentos, além de uma API de dados abertos. SRAG, vacinação, SIM e SINASC não aparecem na página inicial.",
    "gratuito": "Sim",
    "acesso": "Portal e API (apidadosabertos.saude.gov.br). O endereço antigo opendatasus.saude.gov.br redireciona.",
    "licenca": "O portal declara Creative Commons Atribuição-SemDerivações 3.0 para seu conteúdo. Não confirma que valha para cada conjunto.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Formatos não listados na página inicial.",
    "confianca": "Parcial",
    "fonte": "https://dadosabertos.saude.gov.br/",
    "problemas": [
      "Saúde e aplicações biomédicas"
    ],
    "tecnicas": [
      "Conhecimento, mineração de dados e lógica nebulosa"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 73,
    "nome": "SkyWater SKY130 PDK (Google e SkyWater)",
    "url": "https://github.com/google/skywater-pdk",
    "conteudo": "Kit de processo (PDK) aberto de 130 nm: regras de projeto, arquivos de suporte a ferramentas de EDA, bibliotecas de células primitivas, modelos analógicos e várias bibliotecas de células digitais padrão.",
    "gratuito": "Sim",
    "acesso": "git clone do repositório no GitHub; documentação em skywater-pdk.rtfd.io.",
    "licenca": "Apache 2.0",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "~7 GB (bibliotecas de células mais recentes)",
    "citacao": "",
    "obs": "Estado 'alfa' e 'experimental', não destinado a produção. Permite prototipar e fabricar chips de teste de forma aberta.",
    "confianca": "Confirmado",
    "fonte": "https://github.com/google/skywater-pdk",
    "problemas": [
      "Eletrônica, circuitos e computação embarcada"
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
    "conteudo": "Envelhecimento acelerado de seis IGBTs por sobretensão térmica; MOSFETs de potência até a falha; capacitores sob estresse elétrico de 10, 12 e 14 V com espectroscopia de impedância.",
    "gratuito": "Parcial",
    "acesso": "IGBT e capacitores (estresse elétrico): download direto. MOSFET: link listado, referência fora do ar. Capacitores-2: contato com a NASA.",
    "licenca": "Sem licença declarada; uso por conta e risco, com agradecimento ao repositório.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    "problemas": [
      "Eletrônica, circuitos e computação embarcada"
    ],
    "tecnicas": [
      "Confiabilidade, risco e segurança de sistemas",
      "Experimentação, ensaios e instrumentação"
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
    "conteudo": "Dados geográficos colaborativos do mundo todo (vias, edificações, uso do solo).",
    "gratuito": "Sim",
    "acesso": "Exportação e extratos; a API, os tiles e o Nominatim têm políticas de uso próprias e não há API de mapas gratuita para terceiros.",
    "licenca": "Open Database License (ODbL). Atribuir ao OpenStreetMap e declarar a licença; derivados só podem ser distribuídos sob a mesma licença.",
    "classe": "Aberta com compartilhamento igual",
    "comercial": "Sim, com atribuição e compartilhamento igual",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Confirmado",
    "fonte": "https://www.openstreetmap.org/copyright",
    "problemas": [
      "Transporte e logística",
      "VANTs, robôs e veículos autônomos"
    ],
    "tecnicas": [
      "Otimização e pesquisa operacional"
    ],
    "temas": [
      "Navegação, robótica e fusão sensorial"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 76,
    "nome": "CVRPLIB (PUC-Rio)",
    "url": "https://galgos.inf.puc-rio.br/cvrplib/index.php/en/",
    "conteudo": "Instâncias de benchmark para roteamento de veículos capacitado (conjuntos A, B, E, F, M, P, CMT, tai, Golden, Li, X, AGS, DIMACS, XML, XL) e com janelas de tempo (Solomon), com melhores soluções conhecidas e indicação de otimalidade.",
    "gratuito": "Sim",
    "acesso": "Download direto das instâncias.",
    "licenca": "Não declarada na página; há link 'Terms of Use' não lido.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Para o conjunto X: Uchoa et al., European J. of Operational Research, 2017, doi:10.1016/j.ejor.2016.08.012.",
    "obs": "Biblioteca brasileira. A página mostra logos de PUC-Rio, UFF e UFPB, mas não diz quem a mantém.",
    "confianca": "Parcial",
    "fonte": "https://galgos.inf.puc-rio.br/cvrplib/index.php/en/",
    "problemas": [
      "Transporte e logística"
    ],
    "tecnicas": [
      "Otimização e pesquisa operacional"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 77,
    "nome": "TSPLIB",
    "url": "http://comopt.ifi.uni-heidelberg.de/software/TSPLIB95/",
    "conteudo": "Instâncias de caixeiro-viajante (simétrico e assimétrico), ciclo hamiltoniano, ordenação sequencial e roteamento capacitado, com soluções ótimas ou melhores conhecidas.",
    "gratuito": "Não confirmado",
    "acesso": "Download direto na página.",
    "licenca": "Não declarada na página.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A biblioteca não pretende receber novas instâncias.",
    "confianca": "Parcial",
    "fonte": "http://comopt.ifi.uni-heidelberg.de/software/TSPLIB95/",
    "problemas": [
      "Transporte e logística"
    ],
    "tecnicas": [
      "Otimização e pesquisa operacional"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 78,
    "nome": "MIPLIB 2017",
    "url": "https://miplib.zib.de/",
    "conteudo": "Biblioteca de instâncias reais de programação inteira mista para comparar solvers: conjunto Benchmark (240 instâncias) e Collection (bem maior). Instâncias marcadas como fáceis, difíceis ou abertas.",
    "gratuito": "Não confirmado",
    "acesso": "Página de download.",
    "licenca": "Não declarada na página.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Gleixner et al., MIPLIB 2017, Mathematical Programming Computation, 2021, doi:10.1007/s12532-020-00194-3.",
    "obs": "Alguns dados foram convertidos ou digitados à mão; pode haver erros.",
    "confianca": "Parcial",
    "fonte": "https://miplib.zib.de/",
    "problemas": [
      "Transporte e logística"
    ],
    "tecnicas": [
      "Otimização e pesquisa operacional"
    ],
    "temas": [],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 79,
    "nome": "UCI Machine Learning Repository",
    "url": "https://archive.ics.uci.edu/",
    "conteudo": "689 conjuntos de dados para aprendizado de máquina, aceitando doações da comunidade.",
    "gratuito": "Não confirmado",
    "acesso": "Navegação e download no site; há login.",
    "licenca": "A página inicial não declara licença. Confira a página de cada conjunto.",
    "classe": "Não confirmada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://archive.ics.uci.edu/",
    "problemas": [],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Conhecimento, mineração de dados e lógica nebulosa"
    ],
    "temas": [
      "Redes neurais artificiais (clássicas)",
      "Mineração de dados e sistemas de conhecimento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 80,
    "nome": "DaISy: Database for the Identification of Systems (KU Leuven)",
    "url": "https://homes.esat.kuleuven.be/~smc/daisy/",
    "conteudo": "Datasets reais de identificação de sistemas em nove categorias: indústria de processos, elétrica e eletrônica, mecânica, biomédica, bioquímica, econométrica, ambiental, clássica e térmica.",
    "gratuito": "Sim",
    "acesso": "FTP e página de datasets.",
    "licenca": "Sem termos declarados.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "A página foi modificada pela última vez em 22/02/2008. Pode estar desatualizada.",
    "confianca": "Parcial",
    "fonte": "https://homes.esat.kuleuven.be/~smc/daisy/",
    "problemas": [],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores",
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
    "conteudo": "15 datasets de sistemas dinâmicos não lineares (Silverbox, Wiener-Hammerstein, Cascaded Tanks, F-16 Ground Vibration Test, NanoDrone, Fine Steering Mirror, Coupled Electric Drives, Industrial Robot, entre outros). Os com asterisco têm leaderboard e loaders em Python.",
    "gratuito": "Sim",
    "acesso": "Páginas de cada dataset e GitHub.",
    "licenca": "Não declarada; há link 'Disclaimer' não lido.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "Schoukens, Champneys, Beintema e Rogers, Data-Centric Engineering, 2026;7:e40, doi:10.1017/dce.2026.10067.",
    "obs": "",
    "confianca": "Parcial",
    "fonte": "https://www.nonlinearbenchmark.org/",
    "problemas": [],
    "tecnicas": [
      "Estimação, filtragem e fusão de sensores",
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
    "conteudo": "Vibração de rolamentos de esferas normais e com falhas semeadas por eletroerosão (0,007 a 0,040 polegada) nas pistas interna e externa e na esfera. Motor de 2 hp, cargas de 0 a 3 hp, 1797 a 1720 rpm.",
    "gratuito": "Não confirmado",
    "acesso": "Página de arquivos de dados.",
    "licenca": "Não declarada; avisos legais do site não lidos.",
    "classe": "Sem licença declarada",
    "comercial": "Não confirmado",
    "tamanho": "",
    "citacao": "",
    "obs": "Benchmark muito usado em diagnóstico de falhas com aprendizado de máquina.",
    "confianca": "Parcial",
    "fonte": "https://engineering.case.edu/bearingdatacenter",
    "problemas": [],
    "tecnicas": [
      "Confiabilidade, risco e segurança de sistemas",
      "Processamento de sinais e imagens",
      "Redes neurais e aprendizado profundo"
    ],
    "temas": [
      "Redes neurais artificiais (clássicas)"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 100,
    "nome": "ImageNet",
    "url": "https://www.image-net.org/",
    "conteudo": "Banco de dados massivo de imagens anotadas segundo a hierarquia WordNet, muito usado em treinamento de redes convolucionais.",
    "gratuito": "Sim",
    "acesso": "Requer cadastro (para acadêmicos e pesquisadores).",
    "licenca": "Uso no comercial / acadmico",
    "classe": "S pesquisa ou no comercial",
    "comercial": "No",
    "tamanho": "~150 GiB",
    "citacao": "Deng et al., ImageNet: A large-scale hierarchical image database, CVPR 2009.",
    "obs": "Fundacional para a explosão do Deep Learning a partir de 2012.",
    "confianca": "Confirmado",
    "fonte": "https://www.image-net.org/",
    "problemas": [
      "Viso Computacional"
    ],
    "tecnicas": [
      "Redes neurais e aprendizado profundo",
      "Processamento de sinais e imagens"
    ],
    "temas": [
      "Aprendizado profundo para imagens e deteco"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 101,
    "nome": "MIMIC-IV",
    "url": "https://physionet.org/content/mimiciv/",
    "conteudo": "Dados desidentificados de sade de pacientes internados em UTI, incluindo sinais vitais, laboratrio, medicaes.",
    "gratuito": "Sim",
    "acesso": "Requer curso de tica em pesquisa em humanos e aprovao no PhysioNet.",
    "licenca": "PhysioNet Credentialed Health Data License 1.5.0",
    "classe": "Restrito / Dados Sensveis",
    "comercial": "No",
    "tamanho": "Dezenas de GiB",
    "citacao": "Johnson et al., MIMIC-IV, a freely accessible electronic health record dataset, Scientific Data 2023.",
    "obs": "Maior dataset de EHR pblico.",
    "confianca": "Confirmado",
    "fonte": "https://physionet.org/content/mimiciv/",
    "problemas": [
      "Sade e Medicina"
    ],
    "tecnicas": [
      "Minerao de dados e sistemas de conhecimento"
    ],
    "temas": [
      "Anlise de dados clnicos"
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
    "comercial": "Sim, com restries",
    "tamanho": "~40 MiB",
    "citacao": "Rajpurkar et al., Know What You Don't Know: Unanswerable Questions for SQuAD, ACL 2018.",
    "obs": "Clssico em NLP.",
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
    "conteudo": "Dados dos passageiros do Titanic (idade, sexo, classe, etc) e indicador de sobrevivncia.",
    "gratuito": "Sim",
    "acesso": "Download via Kaggle.",
    "licenca": "Domnio pblico / Aberta",
    "classe": "Aberta",
    "comercial": "Sim",
    "tamanho": "< 1 MiB",
    "citacao": "Kaggle Titanic Competition.",
    "obs": "O dataset 'Hello World' de Cincia de Dados.",
    "confianca": "Confirmado",
    "fonte": "https://www.kaggle.com/",
    "problemas": [
      "Educao em Cincia de Dados"
    ],
    "tecnicas": [
      "Conhecimento, minerao de dados e lgica nebulosa"
    ],
    "temas": [
      "Minerao de dados e sistemas de conhecimento"
    ],
    "verificado_em": "2026-10-08"
  },
  {
    "id": 104,
    "nome": "NYC Taxi and Limousine Commission (TLC) Trip Record Data",
    "url": "https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page",
    "conteudo": "Registros mensais detalhados de viagens de txi e carros de aplicativo em NY (locais, durao, tarifa).",
    "gratuito": "Sim",
    "acesso": "Download aberto / S3 Bucket.",
    "licenca": "Dados pblicos do governo de NY",
    "classe": "Domnio Pblico / Aberta",
    "comercial": "Sim",
    "tamanho": "Dezenas de GiB",
    "citacao": "NYC TLC",
    "obs": "Muito usado para benchmarks de data warehousing, sries temporais e anlise geoespacial.",
    "confianca": "Confirmado",
    "fonte": "https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page",
    "problemas": [
      "Transporte e logstica",
      "Economia Urbana"
    ],
    "tecnicas": [
      "Otimizao e pesquisa operacional",
      "Minerao de dados e sistemas de conhecimento"
    ],
    "temas": [
      "Planejamento urbano",
      "Big Data"
    ],
    "verificado_em": "2026-10-08"
  }
];

const filterTemas = ["Todos", ...["Anlise de dados clnicos", "Aprendizado por reforço e robótica inteligente", "Aprendizado profundo para imagens e deteco", "Aprendizado profundo para imagens e detecção", "Big Data", "Circuitos e hardware digital", "Controle de sistemas", "Engenharia de sistemas e segurança (STPA)", "Engenharia de software", "Fotônica e enlaces ópticos", "GNSS e ionosfera", "Gestão tecnológica e defesa", "Hipersônica, escoamento e CFD", "Materiais avançados e polímeros", "Minerao de dados e sistemas de conhecimento", "Mineração de dados e sistemas de conhecimento", "Navegação, robótica e fusão sensorial", "Planejamento urbano", "Processamento de Linguagem Natural", "Propulsão a propelente sólido", "Radar SAR e sensoriamento", "Radiação cósmica e aeronaves", "Redes e protocolos de comunicação", "Redes neurais artificiais (clássicas)", "VANTs e sistemas aéreos autônomos"]];
const filterTecnicas = ["Todos", ...["Aprendizado por reforço e agentes", "Comunicações digitais (modulação, codificação, canal)", "Confiabilidade, risco e segurança de sistemas", "Conhecimento, minerao de dados e lgica nebulosa", "Conhecimento, mineração de dados e lógica nebulosa", "Eletromagnetismo, RF e fotônica", "Engenharia de software e de sistemas", "Estimação, filtragem e fusão de sensores", "Experimentação, ensaios e instrumentação", "Minerao de dados e sistemas de conhecimento", "Modelagem e simulação numérica (CFD, elementos finitos)", "Métodos de gestão e apoio à decisão", "Otimizao e pesquisa operacional", "Otimização e pesquisa operacional", "Processamento de sinais e imagens", "Projeto de hardware e sistemas embarcados", "Redes neurais e aprendizado profundo", "Redes, protocolos e segurança da informação", "Síntese e caracterização de materiais", "Teoria e projeto de controle"]];
const filterProblemas = ["Todos", ...["Aeronaves, voo e tráfego aéreo", "Antenas, RF e comunicações ópticas", "Comunicações sem fio e transmissão", "Defesa e guerra eletrônica", "Economia Urbana", "Educao em Cincia de Dados", "Eletrônica, circuitos e computação embarcada", "Energia, baterias e eletroquímica", "Gestão, inovação e políticas", "Materiais e estruturas aeroespaciais", "Navegação, GNSS e ionosfera", "Processamento de Linguagem Natural", "Propulsão, foguetes e hipersônica", "Radar, SAR e sensoriamento remoto", "Radiação e ambiente espacial e atmosférico", "Redes de computadores e internet", "Sade e Medicina", "Satélites e missões espaciais", "Saúde e aplicações biomédicas", "Segurança cibernética", "Software e sistemas de informação", "Transporte e logstica", "Transporte e logística", "VANTs, robôs e veículos autônomos", "Viso Computacional"]];
const filterClasses = ["Todos", ...["Aberta", "Aberta com compartilhamento igual", "Domnio Pblico / Aberta", "Não confirmada", "Restrito / Dados Sensveis", "S pesquisa ou no comercial", "Sem licença declarada", "Só pesquisa ou não comercial", "Termos próprios ou acesso controlado"]];
