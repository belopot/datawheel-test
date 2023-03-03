import {api} from 'api';
import {delay} from 'utils';

/**
 * Fetch imports & exports of a country
 */
export const chartDataRequest = async countryId => {
  try {
    // In order to see loading indicator, added a delay
    await delay(2000);

    // Fetch trade data
    const {data: importsData} = await api.get(
      `/data.jsonrecords?Importer+Country=${countryId}&Year=2020&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=6e4305fa8187405a83a49c15de8dac1e`,
    );

    const {data: exportsData} = await api.get(
      `/data.jsonrecords?Exporter+Country=${countryId}&Year=2020&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=6e4305fa8187405a83a49c15de8dac1e`,
    );

    return {
      imports: importsData.data || [],
      exports: exportsData.data || [],
    };
  } catch (error) {
    return {
      imports: [],
      exports: [],
    };
  }
};
