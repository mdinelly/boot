import jwt from 'jsonwebtoken';

export const obrigatorio = (req: any, res: any, next: any) => {

    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'API');
        req.usuario = decode;
        next();
    } catch(error){
        return res.status(401).send({ mensagem:'Falha no token' });
    }
}

export const opcional = (req: any, res: any, next: any) => {

    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'API');
        req.usuario = decode;
        next();
    } catch(error){
        next();
    }
}
