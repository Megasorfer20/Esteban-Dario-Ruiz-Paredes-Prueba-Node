// Esta función valida la longitud de un texto. Si el texto excede el límite, se lanza un error.
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

// Esta función valida la unicidad de un valor en una tabla. Si el valor ya existe, se lanza un error.
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

// Esta función valida la existencia de un valor en una tabla. Si el valor no existe, se lanza un error.
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

// Esta función valida si un valor es un número. Si no es un número, se lanza un error.
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

// Esta función suma los valores de un array de objetos, dependiendo del parámetro dado.
export const sumadorArrays = async (arrayIngressed, parameter) => {
  let sumaTotal;

  if (parameter === "valor_descuento") {
    sumaTotal = arrayIngressed.reduce((total, valores) => {
      const value =
        valores.productoCarrito.promocion.length > 0
          ? valores.productoCarrito.promocion[0].valor_promocion
          : valores.productoCarrito.valor;

      return (
        total + parseFloat(value) * parseFloat(valores.elememtoCarrito.cantidad)
      );
    }, 0);
  }

  if (parameter === "valor_productos") {
    sumaTotal = arrayIngressed.reduce(
      (total, valores) =>
        total +
        parseFloat(valores.productoCarrito.valor) *
          parseFloat(valores.elememtoCarrito.cantidad),
      0
    );
  }

  return sumaTotal;
};
