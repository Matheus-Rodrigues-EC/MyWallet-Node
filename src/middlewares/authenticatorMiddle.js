

export function authenticator(req, res, next){
    const auth = req.headers.authorization;
    if(!auth) return res.status(422).send("Token Não enviado");

    const token = auth.replace('Baerer ', '');
    try{
        const session = db.collection("sessions").findOne({token: token});
        if(!session) return res.status(401).send("Não autorizado");
    }catch(error){
        return res.status(422).send(error);
    }

    next();
}