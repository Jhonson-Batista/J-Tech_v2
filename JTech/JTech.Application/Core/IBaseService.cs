namespace JTech.Application.Core
{
    public interface IBaseService
    {
        Task<ServiceResult> GetAllAsync();
        Task<ServiceResult> GetByIdAsync(int id);
        Task<ServiceResult> SaveAsync(object dto);
        Task<ServiceResult> UpdateAsync(int id, object dto);
        Task<ServiceResult> DeleteAsync(int id);
    }
}