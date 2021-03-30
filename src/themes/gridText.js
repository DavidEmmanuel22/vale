export const GRID_DEFAULT_LOCALE_TEXT = {
  // Root
  rootGridLabel: 'grid',
  noRowsLabel: 'Sin registros',
  errorOverlayDefaultLabel: 'Error, favor de cargar la página nuevamente.',

  // Density selector toolbar button text
  toolbarDensity: 'Fuente',
  toolbarDensityLabel: 'Densa',
  toolbarDensityCompact: 'Compacta',
  toolbarDensityStandard: 'Estándar',
  toolbarDensityComfortable: 'Cómodo',

  // Columns selector toolbar button text
  toolbarColumns: 'Columnas',
  toolbarColumnsLabel: 'Seleccionar Columnas',

  // Filters toolbar button text
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar filtros',
  toolbarFiltersTooltipHide: 'Esconder filtros',
  toolbarFiltersTooltipShow: 'Mostrar filtros',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} Filtros activos` : `${count} Filtro activo`,

  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Descargar como CSV',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Encontrar columna',
  columnsPanelTextFieldPlaceholder: 'Título columna',
  columnsPanelDragIconLabel: 'Reordenar columna',
  columnsPanelShowAllButton: 'Mostar todo',
  columnsPanelHideAllButton: 'Ocultar todo',

  // Filter panel text
  filterPanelAddFilter: 'Agregar Filtro',
  filterPanelDeleteIconLabel: 'Eliminar',
  filterPanelOperators: 'Operación',
  filterPanelOperatorAnd: 'y',
  filterPanelOperatorOr: 'ó',
  filterPanelColumns: 'Columnas',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Filtrar valor',

  // Filter operators text
  filterOperatorContains: 'contiene',
  filterOperatorEquals: 'igual',
  filterOperatorStartsWith: 'empieza con',
  filterOperatorEndsWith: 'termina con',
  filterOperatorIs: 'es',
  filterOperatorNot: 'no es',
  filterOperatorAfter: 'después',
  filterOperatorOnOrAfter: 'no esta después',
  filterOperatorBefore: 'antes',
  filterOperatorOnOrBefore: 'no esta antes',

  // Column menu text
  columnMenuLabel: 'Menú',
  columnMenuShowColumns: 'Mostrar columnas',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar',
  columnMenuUnsort: 'Desordenar',
  columnMenuSortAsc: 'Orden Ascendente',
  columnMenuSortDesc: 'Orden Descendente',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} active filters` : `${count} active filter`,
  columnHeaderFiltersLabel: 'Show filters',
  columnHeaderSortIconLabel: 'Sort',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} registros seleccionados`
      : `${count.toLocaleString()} registro seleccionado`,

  // Total rows footer text
  footerTotalRows: 'Total Registros:'
}
