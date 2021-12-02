"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoryUseCase = void 0;

var _csvParse = _interopRequireDefault(require("csv-parse"));

var _fs = _interopRequireDefault(require("fs"));

var _tsyringe = require("tsyringe");

var _ICategoriesRepository = require("../../repository/ICategoriesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ImportCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ImportCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;

    this.execute = async file => {
      const categories = await this.loadCategories(file); // console.log(categories);
      // map percorre dado por dado igual o foreach

      categories.map(async c => {
        const {
          name,
          description
        } = c;
        const existCategory = await this.categoriesRepository.findByName(name);

        if (!existCategory) {
          await this.categoriesRepository.create({
            name,
            description
          });
        }
      });
    };
  }

  loadCategories(file) {
    return new Promise((resolve, reject) => {
      // usar modelo nativo fs
      // usar a funcao createReadStream
      // permite fazer a leitura em partes
      // precisa passar o path do file
      const stream = _fs.default.createReadStream(file.path);

      const categories = []; // eu crio uma const usando o parse
      // eu posso passar configuracao

      const parseFile = (0, _csvParse.default)({}); // usar a funcao pipe para
      // percorre o que ta sendo lindo
      // e joga para outra funcao arquivo etc

      stream.pipe(parseFile);
      parseFile.on('data', async line => {
        // ['name','description']
        // console.log(line)
        const [name, description] = line;
        categories.push({
          name,
          description
        });
      }).on('end', () => {
        // remover o arquivo tmp
        _fs.default.promises.unlink(file.path);

        resolve(categories);
      }).on('error', err => {
        reject(err);
      }); // ele tem que ser colocado em uma promise
      // e da um . on para da o retorno em resolve
      // . om para o retorno no error
    });
  }

}) || _class) || _class) || _class) || _class);
exports.ImportCategoryUseCase = ImportCategoryUseCase;