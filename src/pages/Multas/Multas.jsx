import Loader from "../../Components/Loader/Loader"
import styles from "./Multas.module.css"
import userSVG from "../../assets/svg/user.svg"
import { NavBar } from "../../layout/NavBar"
import useMultas from "../../hooks/multas/multas"
import { usePagination } from "../../hooks/libros/usePagination"
import { Footer } from "../../layout/Footer"
import { useState, useEffect } from "react"
import { BASE_URL } from "../../config.json"

function Multas() {
  const { loading, error, multasData, refetch: refetchMultas } = useMultas();
  const { currentPage, paginatedItems: paginatedMultas, handlePageChange } = usePagination(multasData, 3);
  const [isLoading, setIsLoading] = useState(false);
  const [paypalError, setPaypalError] = useState(null);
  const [message, setMessage] = useState(null);
  const [usuariosConOrden, setUsuariosConOrden] = useState({});

   const handleConfirmarOrden = (username) => {
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
          refetchMultas(); 
        } else {
          setMessage("Payment failed or incomplete.");
        }
      } catch (error) {
        setPaypalError(error.message);
      } finally {
        setIsLoading(false);
        setTimeout(() => {

          window.location.reload();
        }, 2000);
      }
    };
  };

  const initiatePayment = async (username) => {
    if (!username) {
      setPaypalError("Username is required");
      return;
    }

    try {
      setIsLoading(true);
      setPaypalError(null);

      const response = await fetch(`${BASE_URL}/paypal/pay/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const { approvalLink } = await response.json();
      if (approvalLink) {
        window.location.href = approvalLink;
      } else {
        throw new Error("Approval link not found");
      }
    } catch (error) {
      setPaypalError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
  
      setUsuariosConOrden((prevState) => {
        const hasChanges = JSON.stringify(prevState) !== JSON.stringify(usuariosOrdenes);
        return hasChanges ? usuariosOrdenes : prevState;
      });
    };
  
    if (paginatedMultas.length > 0) {
      verificarOrdenes();
    }
  }, [paginatedMultas]);

  const handleClick = (username) => {
    return () => {
      initiatePayment(username);
    };
  };

  const hubIcons = [{ icon: userSVG, href: "/login" }];

  return (
    <>
      {loading && <Loader />}
      <header className={styles.header}>
        <NavBar showBuscador={false} returnToHome={true} hubIcons={hubIcons} generateButton={false} />
      </header>

      <main className={styles.main}>
        {error && <div className={styles.error}>Error: {error}</div>}

        {!loading && multasData.length === 0 && (
          <div className={styles.noResults}>No hay usuarios con multas pendientes :)</div>
        )}

        {paginatedMultas.map((usuario, index) => (
          <article key={index} className={styles.multaCard}>
            <div className={styles.userRow}>
              <h2 className={styles.nombreUsuario}>{usuario.username}</h2>
              <p className={styles.total}>Total de multas: ${usuario.total?.toFixed(2)}</p>
            </div>

            <div className={styles.accionesRow}>
              <button className={styles.pagarButton} onClick={handleClick(usuario.username)} disabled={isLoading}>
                {isLoading ? <Loader /> : "Pagar con PayPal"}
              </button>
              {usuariosConOrden[usuario.username] && ( 
                <button
                  className={styles.pagarButton}
                  disabled={isLoading}
                  style={{ marginLeft: "1rem" }}
                  onClick={handleConfirmarOrden(usuario.username)}
                >
                  {isLoading ? <Loader /> : "Confirmar Orden"}
                </button>
              )}
              <span className={styles.multaNumber}>#{(currentPage - 1) * 3 + index + 1}</span>
            </div>
          </article>
        ))}
        {paypalError && <p style={{ color: "red" }}>Error: {paypalError}</p>}

        {message && <p style={{ color: "green" }}>{message}</p>}
      </main>

      <footer>{multasData.length > 3 && <Footer onPageChange={handlePageChange} currentPage={currentPage} />}</footer>
    </>
  );
}

export default Multas;
