import { Request, Response } from "express";

const HandleSignOut = (req: Request, res: Response) => {
  req.session = null;
  res.send({});
};

export default HandleSignOut;
