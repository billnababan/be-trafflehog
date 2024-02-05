function toDatetime(value) {
  const formattedDate = new Date(value).toISOString().slice(0, 19).replace("T", " ");

  console.log(formattedDate);
}

module.exports = toDatetime;
