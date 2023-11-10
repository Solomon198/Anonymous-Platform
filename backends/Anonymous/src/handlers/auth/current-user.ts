import { Request, Response } from "express";

const HandleGetCurrentUser = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export default HandleGetCurrentUser;
