// https://www.tutorialspoint.com/mongodb/mongodb_autoincrement_sequence.htm

export async function getNextSequenceValue(counterModel, sequenceName){
  var sequenceDocument = await counterModel.findOneAndUpdate(
    {name: sequenceName},
    {$inc:{sequence_value:1}},
    { new: true }
  ).exec();
  return sequenceDocument.sequence_value;
}