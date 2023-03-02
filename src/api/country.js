import {api} from 'api';

/**
 * Fetch country list
 * @returns
 */
export const allCountriesRequest = async () => {
  try {
    const {data} = await api.get(
      `/members?cube=trade_i_baci_a_92&level=Country&locale=en`,
    );
    return data.data;
  } catch (error) {
    return null;
  }
};
