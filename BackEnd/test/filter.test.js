import {
  filterPaymentsByContractType,
  filterPaymentByEmployeeID,
  filterPaymentsByProjectName,
} from "../src/utils/employeePaymentsFilters";
//PASS
test("Filter Payments by Contract Type", () => {
  const contractType = "Medio Tiempo";
  const payments = [
    { TipoContrato: "Medio Tiempo", salario: 310001 },
    { TipoContrato: "Medio Tiempo", salario: 1211112 },
    { TipoContrato: "Medio Tiempo", salario: 900121 },
    { TipoContrato: "Tiempo Completo", salario: 900121 },
    { TipoContrato: "Tiempo Completo", salario: 900121 },
    { TipoContrato: "Tiempo Completo", salario: 900121 },
  ];
  expect(filterPaymentsByContractType(payments, contractType)).toStrictEqual([
    { TipoContrato: "Medio Tiempo", salario: 310001 },
    { TipoContrato: "Medio Tiempo", salario: 1211112 },
    { TipoContrato: "Medio Tiempo", salario: 900121 },
  ]);
});
//FAILS
test("Case where there is no elements with an especific contract type", () => {
  const contractType = "Pasantías";
  const payments = [
    { TipoContrato: "Medio Tiempo", salario: 310001 },
    { TipoContrato: "Medio Tiempo", salario: 1211112 },
    { TipoContrato: "Medio Tiempo", salario: 900121 },
    { TipoContrato: "Tiempo Completo", salario: 900121 },
    { TipoContrato: "Tiempo Completo", salario: 900121 },
    { TipoContrato: "Tiempo Completo", salario: 900121 },
  ];
  expect(filterPaymentsByContractType(payments, contractType)).toStrictEqual(
    []
  );
});
//PASS
test("Filter Payments by Project Name", () => {
  const projectName = "Cine Milagro";
  const payments = [
    { NombreProyecto: "Cine Milagro", salario: 310001 },
    { NombreProyecto: "Cine Milagro", salario: 1211112 },
    { NombreProyecto: "Cine Milagro", salario: 900121 },
    { NombreProyecto: "Cine", salario: 900121 },
    { NombreProyecto: "Cine", salario: 900121 },
    { NombreProyecto: "Cine", salario: 900121 },
  ];
  expect(filterPaymentsByProjectName(payments, projectName)).toStrictEqual([
    { NombreProyecto: "Cine Milagro", salario: 310001 },
    { NombreProyecto: "Cine Milagro", salario: 1211112 },
    { NombreProyecto: "Cine Milagro", salario: 900121 },
  ]);
});
//FAILS
test("Filter Payments by Project Name", () => {
  const projectName = "Clinica Pirata";
  const payments = [
    { NombreProyecto: "Cine Milagro", salario: 310001 },
    { NombreProyecto: "Cine Milagro", salario: 1211112 },
    { NombreProyecto: "Cine Milagro", salario: 900121 },
    { NombreProyecto: "Cine", salario: 900121 },
    { NombreProyecto: "Cine", salario: 900121 },
    { NombreProyecto: "Cine", salario: 900121 },
  ];
  expect(filterPaymentsByProjectName(payments, projectName)).toStrictEqual([]);
});
//PASS
test("Filter Payments by Employee ID", () => {
  const projectName = "118020915";
  const payments = [
    { CedulaEmpleado: "118020915", salario: 310001 },
    { CedulaEmpleado: "118020915", salario: 1211112 },
    { CedulaEmpleado: "118020915", salario: 900121 },
    { CedulaEmpleado: "121991211", salario: 900121 },
    { CedulaEmpleado: "121991211", salario: 900121 },
    { CedulaEmpleado: "121991211", salario: 900121 },
  ];
  expect(filterPaymentByEmployeeID(payments, projectName)).toStrictEqual([
    { CedulaEmpleado: "118020915", salario: 310001 },
    { CedulaEmpleado: "118020915", salario: 1211112 },
    { CedulaEmpleado: "118020915", salario: 900121 },
  ]);
});
//FAILS
test("Filter Payments by Employee ID", () => {
    const projectName = "121111111";
    const payments = [
      { CedulaEmpleado: "118020915", salario: 310001 },
      { CedulaEmpleado: "118020915", salario: 1211112 },
      { CedulaEmpleado: "118020915", salario: 900121 },
      { CedulaEmpleado: "121991211", salario: 900121 },
      { CedulaEmpleado: "121991211", salario: 900121 },
      { CedulaEmpleado: "121991211", salario: 900121 },
    ];
    expect(filterPaymentByEmployeeID(payments, projectName)).toStrictEqual([]);
});
