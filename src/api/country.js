import {api} from 'api';
import {delay} from 'utils';

/**
 * Fetch country list
 */
export const allCountriesRequest = async () => {
  try {
    // In order to see loading indicator, added a delay
    await delay(2000);

    // Get country
    const {data} = await api.get(
      `/members?cube=trade_i_baci_a_92&level=Country&locale=en`,
    );
    return data.data;
  } catch (error) {
    return null;
  }
};
