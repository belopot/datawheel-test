import {api} from 'api';
import {delay} from 'utils';

/**
 * Fetch imports & exports of a country
 */
export const tradeDataRequest = async ([countryId, year]) => {
  try {
    // In order to see loading indicator, added a delay
    await delay(2000);

    // Fetch trade data
    const {data: importsData} = await api.get(
      `/data.jsonrecords?Importer+Country=${countryId}&Year=${year}&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=6e4305fa8187405a83a49c15de8dac1e`,
    );

    const {data: exportsData} = await api.get(
      `/data.jsonrecords?Exporter+Country=${countryId}&Year=${year}&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=6e4305fa8187405a83a49c15de8dac1e`,
    );

    let totalImports = 0;
    importsData.data.forEach(d => (totalImports += d['Trade Value']));

    let totalExports = 0;
    exportsData.data.forEach(d => (totalExports += d['Trade Value']));

    // Fetch trade data for previous year
    const {data: prevImportsData} = await api.get(
      `/data.jsonrecords?Importer+Country=${countryId}&Year=${
        year - 1
      }&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=6e4305fa8187405a83a49c15de8dac1e`,
    );

    const {data: prevExportsData} = await api.get(
      `/data.jsonrecords?Exporter+Country=${countryId}&Year=${
        year - 1
      }&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=6e4305fa8187405a83a49c15de8dac1e`,
    );

    let prevTotalImports = 0;
    prevImportsData.data.forEach(d => (prevTotalImports += d['Trade Value']));

    let prevTotalExports = 0;
    prevExportsData.data.forEach(d => (prevTotalExports += d['Trade Value']));

    return {
      imports: importsData.data || [],
      exports: exportsData.data || [],
      totalImports: totalImports,
      prevTotalImports: prevTotalImports,
      importsPercent: Math.round((totalImports / prevTotalImports) * 100),
      totalExports: totalExports,
      prevTotalExports: prevTotalExports,
      exportsPercent: Math.round((totalExports / prevTotalExports) * 100),
    };
  } catch (error) {
    return null;
  }
};
