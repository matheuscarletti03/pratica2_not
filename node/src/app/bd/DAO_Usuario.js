class DAO_Usuario{
    constructor(bd){
        this._bd= bd;
    }

    login(email, password){
      return new Promise((resolve, reject) =>{
        const sql= 'select email, senha from lb_usuario where email=? and senha=?'
        this._bd.query(sql, [email, password], (erro, recordset) =>{
          if (erro) {
            console.log(erro);
            return reject("Falha ao fazer login...");
          }
          resolve(recordset);
        })
      })
    }
    
    incluirDadosEJS(nome, sobrenome, cpf, email, senha, linhaPreferida) {
        return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO lb_Usuario (nome, sobrenome, cpf, email, senha, linhaPreferida) VALUES (?, ?, ?, ?, ?, ?)';
          this._bd.query(sql, [nome, sobrenome, cpf, email, senha, linhaPreferida], (erro, recordset) => {
            if (erro) {
              console.log(erro);
              return reject("Inserção de Cliente falhou");
            }
            resolve(recordset);
          });
        });
      };


      async getPontosPeloID(ids) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT idPonto, logradouro, lat, lon FROM lb_Pontos WHERE idPonto IN (?)`;

            this._bd.query(sql, [ids], (erro, recordset) => {
                if (erro) {
                    console.log(erro);
                    return reject("Get Pontos falhou");
                }
                resolve(recordset);
            });
        });
    }
};

module.exports= DAO_Usuario;