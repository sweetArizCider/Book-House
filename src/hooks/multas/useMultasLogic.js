import { useState, useEffect } from "react";
import { BASE_URL } from "../../config.json";

export const useMultasLogic = (paginatedMultas) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paypalError, setPaypalError] = useState(null);
  const [message, setMessage] = useState(null);
  const [usuariosConOrden, setUsuariosConOrden] = useState({});

  // Verificar órdenes de los usuarios
  useEffect(() => {
    const verificarOrdenes = async () => {
      const usuariosOrdenes = {};
      for (const usuario of paginatedMultas) {
        try {
          const response = await fetch(`${BASE_URL}/paypal/${usuario.username}/orders`);
          if (response.ok) {
            const data = await response.json();
            if (data && data.orderid) {
              usuariosOrdenes[usuario.username] = true;
            }
          }
        } catch (error) {
          console.error(`Error verificando órdenes para ${usuario.username}:`, error);
        }
      }

      // Solo actualiza el estado si hay cambios
      setUsuariosConOrden((prevState) => {
        const hasChanges = JSON.stringify(prevState) !== JSON.stringify(usuariosOrdenes);
        return hasChanges ? usuariosOrdenes : prevState;
      });
    };

    if (paginatedMultas.length > 0) {
      verificarOrdenes();
    }
  }, [paginatedMultas]);

  // Confirmar una orden
  const handleConfirmarOrden = (username, refetchMultas) => {
    return async () => {
      try {
        setIsLoading(true);
        setPaypalError(null);

        const response = await fetch(`${BASE_URL}/paypal/${username}/orders`);
        if (!response.ok) {
          throw new Error("Failed to fetch order information");
        }

        const { orderid } = await response.json();

        const captureResponse = await fetch(`${BASE_URL}/paypal/${orderid}/capture/${username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!captureResponse.ok) {
          throw new Error("Failed to capture payment");
        }

        const result = await captureResponse.json();

        if (result.status === "COMPLETED") {
          setMessage("Payment successful! Fines have been paid.");
          refetchMultas(); // Recargar multas después de confirmar la orden
        } else {
          setMessage("Payment failed or incomplete.");
        }
      } catch (error) {
        setPaypalError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  };

  return {
    isLoading,
    paypalError,
    message,
    usuariosConOrden,
    handleConfirmarOrden,
  };
};