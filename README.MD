## RentalX-Backend

**RF** => Requisitos funcionais

**RNF** => Requisitos não funcionais

**RN** => Regras de negócio

# Cadastro de carro

**RF**

-   Deve ser possível cadastrar um novo carro [x]

**RN**

-   Não deve ser possivel cadastrar um carro com uma placa já existente [x]
-   O carro deve ser cadastrado com disponibilidade por padrão [x]
-   O usuario responsavel pelo cadastro do carro deve ser adm. [x]

# Listagem de carros

**RF**

-   Deve ser possivel listar todos carros disponíveis [x]
-   Deve ser possivel listar todos carros disponíveis pelo nome da categoria [x]
-   Deve ser possivel listar todos carros disponíveis pelo nome da marca [x]
-   Deve ser possivel listar todos carros disponíveis pelo nome da carro [x]

**RN**

-   O usuario não precisa estar logado no sistema.[x]

# Cadastro de Especificação no carro

**RF**

-   Deve ser possivel cadastrar uma especificação para um carro [x]

**RN**

-   Não deve ser possivel cadastrar uma especificação para um carro não cadastrado [x]
-   Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro
-   O usuario responsavel pelo cadastro deve ser adm.[x]

# Cadastro de imagens do carro

**RF**

-   Deve ser possivel cadastrar a imagem do carro [x]

**RNF**

-   Utilizar o multer para upload dos arquivos [x]

**RN**

-   O usuario deve poder cadastrar mais de uma imagem para o mesmo carro [x]
-   O usuario responsavel pelo cadastro deve ser adm. [x]

# Aluguel de carro

**RF**

-   Deve ser possivel cadastrar um aluguel

**RN**

-   O aluguel deve ter duracao minima de 24 Horas.
-   Nao deve ser possivel cadastrar um novo aluguel caso ja existe um aberto para o mesmo usuario
-   Nao deve ser possivel cadastrar um novo aluguel caso ja existe um aberto para o mesmo carro
