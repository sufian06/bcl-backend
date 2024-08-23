import { Player } from "./player.model.js";

const getAllPlayerFromDB = async () => {
  const result = await Player.find();

  return result;
};

const getByIdFromDB = async (id) => {
  const result = await Player.findById({ _id: id }).populate("team");

  return result;
};

const updateOneFromDB = async (id, payload) => {
  const result = await Player.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const PlayerService = {
  getAllPlayerFromDB,
  getByIdFromDB,
  updateOneFromDB,
};
