namespace JTech.Application.Core
{
    public abstract class BaseService
    {
        protected ServiceResult Ok(string message = "Operación exitosa")
        {
            return new ServiceResult { Success = true, Message = message };
        }

        protected ServiceResult Fail(string message)
        {
            return new ServiceResult { Success = false, Message = message };
        }
    }
}