export const lenghtValidation = async (text, limit) => {
  if (text) {
    if (text.length <= limit) {
      return text;
    } else {
      throw new Error(`Se excedió del límite de carácteres`);
    }
  } else {
    throw new Error(`Campo vacío, por favor rellenar todos los campos`);
  }
};

export const uniqueValidation = async (searchRow, table, value) => {
  if (searchRow) {
    const parameter = await table.findOne({
      where: { [searchRow]: value },
    });

    if (parameter) {
      throw new Error(
        `El campo debe ser único, por favor cambiar valor de ${searchRow}`
      );
    } else {
      return value;
    }
  } else {
    throw new Error(`Campo vacío, por favor rellenar todos los campos`);
  }
};

export const existValidation = async (searchRow, table, value) => {
  if (searchRow) {
    const parameter = table.findOne({
      where: { [searchRow]: value },
    });

    if (parameter) {
      return value;
    } else {
      throw new Error(
        `El campo debe ser existente, por favor cambiar valor de ${searchRow}`
      );
    }
  } else {
    throw new Error(`Campo vacío, por favor rellenar todos los campos`);
  }
};

export const numberValdation = async (value) => {
  if (value) {
    if (!isNaN(value)) {
      return Number(value);
    } else {
      throw new Error(`Este campo debe ser un número`);
    }
  } else {
    throw new Error(`Campo vacío, por favor rellenar todos los campos`);
  }
};
