import { fetchDataById } from '@/utils/checkinout';
import { getReservationById } from '@/utils/reservationRepository';
import { getUserById } from '@/utils/userRepository';
import { getVehicleById } from '@/utils/vehicleRepository';

jest.mock('@/utils/reservationRepository');
jest.mock('@/utils/userRepository');
jest.mock('@/utils/vehicleRepository');

describe('fetchDataById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches reservation data', async () => {
    const id = 'reservation_id';
    const data = { success: true, value: { id: 'reservation_id', type: 'reservation' } };
    getReservationById.mockResolvedValue(data);

    const result = await fetchDataById(id, 'reservation');

    expect(getReservationById).toHaveBeenCalledWith(id);
    expect(result).toEqual(data.value);
  });

  it('fetches user data', async () => {
    const id = 'user_id';
    const data = { success: true, value: { id: 'user_id', type: 'user' } };
    getUserById.mockResolvedValue(data);

    const result = await fetchDataById(id, 'user');

    expect(getUserById).toHaveBeenCalledWith(id);
    expect(result).toEqual(data.value);
  });

  it('fetches vehicle data', async () => {
    const id = 'vehicle_id';
    const data = { success: true, value: { id: 'vehicle_id',type: 'vehicle' } };
    getVehicleById.mockResolvedValue(data);

    const result = await fetchDataById(id, 'vehicle');

    expect(getVehicleById).toHaveBeenCalledWith(id);
    expect(result).toEqual(data.value);
  });

  it('returns null for unknown type', async () => {
    const result = await fetchDataById('id', 'unknown');

    expect(getReservationById).not.toHaveBeenCalled();
    expect(getUserById).not.toHaveBeenCalled();
    expect(getVehicleById).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('returns null when request fails', async () => {
    const id = 'reservation_id';
    const data = { success: false, value: null };
    getReservationById.mockResolvedValue(data);

    const result = await fetchDataById(id, 'reservation');

    expect(getReservationById).toHaveBeenCalledWith(id);
    expect(result).toBeNull();
  });
});
