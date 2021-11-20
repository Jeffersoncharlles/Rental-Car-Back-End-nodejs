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

-   Deve ser possivel listar todos carros disponíveis
-   Deve ser possivel listar todos carros disponíveis pelo nome da categoria
-   Deve ser possivel listar todos carros disponíveis pelo nome da marca
-   Deve ser possivel listar todos carros disponíveis pelo nome da carro

**RN**

-   O usuario não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**

-   Deve ser possivel cadastrar uma especificação para um carro
-   Deve ser possivel listar todas as especificação
-   Deve ser possivel listar todos os carros

**RN**

-   Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
-   Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro
-   O usuario responsavel pelo cadastro deve ser adm.

# Cadastro de imagens do carro

**RF**

-   Deve ser possivel listar todos os carros
-   Deve ser possivel cadastrar a imagem do carro

**RNF**

-   Utilizar o multer para upload dos arquivos

**RN**

-   O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
-   O usuario responsavel pelo cadastro deve ser adm.

# Aluguel de carro

**RF**

-   Deve ser possivel cadastrar um aluguel

**RN**

-   O aluguel deve ter duracao minima de 24 Horas.
-   Nao deve ser possivel cadastrar um novo aluguel caso ja existe um aberto para o mesmo usuario
-   Nao deve ser possivel cadastrar um novo aluguel caso ja existe um aberto para o mesmo carro
